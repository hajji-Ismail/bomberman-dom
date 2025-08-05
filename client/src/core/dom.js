// src/core/dom.js
import { GlobalEvents } from './events.js';

export class Renderer {
    constructor() {
        this.eventIdCounter = 0;
        this.oldVtree = null;
        this._setupGlobalListeners();
    }

    _setupGlobalListeners() {
        const eventTypes = ['click', 'input', 'change', 'submit', 'keydown', 'dblclick', 'blur'];

        eventTypes.forEach(eventType => {
            const useCapture = eventType === 'blur';
            document.addEventListener(eventType, (e) => {
                const target = e.target;
                const handlerId = target.getAttribute(`data-event-${eventType}`);
                if (handlerId) {
                    GlobalEvents.emit(handlerId, e);
                }
            }, useCapture);
        });
    }

    _createElement(vnode) {
        if (typeof vnode === 'string') return document.createTextNode(vnode);
        if (!vnode.tag) return document.createTextNode('');

        const el = document.createElement(vnode.tag);

        for (const [attr, value] of Object.entries(vnode.attrs || {})) {
            if (attr.startsWith('on') && typeof value === 'function') {
                const eventType = attr.slice(2).toLowerCase();
                const handlerId = `evt-${eventType}-${this.eventIdCounter++}`;
                GlobalEvents.on(handlerId, value);
                el.setAttribute(`data-event-${eventType}`, handlerId);
            }
            else if (attr === 'checked') {
                el.attr = !!value;
            }
            else if (attr === 'disabled') {
                el[attr] = !!value;
            }
            else if (attr === 'selected') {
                el[attr] = !!value;
            }
            else {
                el.setAttribute(attr, value);
            }
        }


        if (vnode.children) {
            vnode.children.forEach(child => el.appendChild(this._createElement(child)));
        }

        if (vnode.text) {
            el.appendChild(document.createTextNode(vnode.text));
        }

        vnode.el = el;
        return el;
    }

    render(target, vtree) {
        const root = typeof target === 'string' ? document.querySelector(target) : target;
        if (!root) return;

        if (!this.oldVtree) {
            root.innerHTML = '';
            this.rootElement = this._createElement(vtree);
            root.appendChild(this.rootElement);
            this.oldVtree = vtree;
        } else {
            this._patch(root, vtree, this.oldVtree);
            this.oldVtree = vtree;
        }
    }

    _patch(parent, newNode, oldNode) {

        if (!oldNode) {
            if (newNode) {
                const newEl = this._createElement(newNode);
                parent.appendChild(newEl);
                newNode.el = newEl;
            }
            return;
        }

        if (!newNode) {
            this._cleanupEventAttributes(oldNode);
            if (oldNode.el && oldNode.el.parentNode === parent) {
                parent.removeChild(oldNode.el);
            }
            return;
        }

        if (typeof newNode === 'string' || typeof oldNode === 'string') {
            if (newNode !== oldNode) {
                const newEl = this._createElement(newNode);
                if (oldNode.el && oldNode.el.parentNode === parent) {
                    parent.replaceChild(newEl, oldNode.el);
                } else {
                    parent.appendChild(newEl);
                }
                if (typeof newNode !== 'string') newNode.el = newEl;
            } else {
                newNode.el = oldNode.el;
            }
            return;
        }

        // Replace if tag or key changed
        if (newNode.tag !== oldNode.tag || newNode.attrs?.key !== oldNode.attrs?.key) {
            const newEl = this._createElement(newNode);
            this._cleanupEventAttributes(oldNode);
            if (oldNode.el && oldNode.el.parentNode === parent) {
                parent.replaceChild(newEl, oldNode.el);
            } else {
                parent.appendChild(newEl);
            }
            newNode.el = newEl;
            return;
        }

        // In-place update
        const el = (newNode.el = oldNode.el);

        this._updateAttributes(el, newNode.attrs || {}, oldNode.attrs || {});

        // Children patching with keyed diffing
        const newChildren = newNode.children || [];
        const oldChildren = oldNode.children || [];

        const oldKeyed = new Map();
        const oldUnkeyed = [];

        // Build maps for old children
        oldChildren.forEach((child, index) => {
            const key = child?.attrs?.key;
            if (key != null) {
                oldKeyed.set(key, child);
            } else {
                oldUnkeyed.push({ child, index });
            }
        });

        const usedOldIndices = new Set();

        //  Map new children to old indices or -1
        const newIndexToOldIndexMap = new Array(newChildren.length);
        const newChildrenWithOldIndex = [];

        newChildren.forEach((newChild, i) => {
            const key = newChild?.attrs?.key;
            if (key != null && oldKeyed.has(key)) {
                const oldChild = oldKeyed.get(key);
                const oldIndex = oldChildren.indexOf(oldChild);
                newIndexToOldIndexMap[i] = oldIndex;
                oldKeyed.delete(key);
                newChildrenWithOldIndex.push({ newChild, newIndex: i, oldIndex });
                usedOldIndices.add(oldIndex);
            } else if (oldUnkeyed.length > 0) {
                const entry = oldUnkeyed.shift();
                newIndexToOldIndexMap[i] = entry.index;
                newChildrenWithOldIndex.push({ newChild, newIndex: i, oldIndex: entry.index });
                usedOldIndices.add(entry.index);
            } else {
                newIndexToOldIndexMap[i] = -1; // new node
                newChildrenWithOldIndex.push({ newChild, newIndex: i, oldIndex: -1 });
            }
        });

        // Patch all children
        newChildrenWithOldIndex.forEach(({ newChild, oldIndex }) => {
            const oldChild = oldIndex !== -1 ? oldChildren[oldIndex] : null;
            this._patch(el, newChild, oldChild);
        });

        //  Insert new nodes only (skip moving existing nodes)
        for (let i = 0; i < newChildren.length; i++) {
            if (newIndexToOldIndexMap[i] === -1) {
                const newChild = newChildren[i];
                const domChild = newChild.el;
                const refNode = el.childNodes[i] || null;
                el.insertBefore(domChild, refNode);
            }
        }

        // Remove leftover old keyed nodes not matched
        oldKeyed.forEach(oldChild => this._patch(el, null, oldChild));

        // Remove leftover old unkeyed nodes not matched
        oldUnkeyed.forEach(({ child, index }) => {
            if (!usedOldIndices.has(index)) {
                this._patch(el, null, child);
            }
        });

        if (newNode.text !== oldNode.text) {
            el.textContent = newNode.text || '';
        }
    }


    _updateAttributes(el, newAttrs, oldAttrs) {
        // Remove old attributes not in newAttrs
        for (const key of Object.keys(oldAttrs)) {
            if (!(key in newAttrs)) {
                el.removeAttribute(key);
            }
        }

        // Add/update new attributes (except event handlers)
        for (const [key, value] of Object.entries(newAttrs)) {
            if (key.startsWith('on')) continue;
            else if (key === 'checked') {
                el[key] = !!value;
            }
            else if (key === 'disabled') {
                el[key] = !!value;
            }
            else if (key === 'selected') {
                el[key] = !!value;
            }
            else {
                el.setAttribute(key, value);
            }

        }
    }

    _cleanupEventAttributes(vnode) {
        if (!vnode?.attrs) return;
        for (const [attr, value] of Object.entries(vnode.attrs)) {
            if (attr.startsWith('on') && typeof value === 'function') {
                const eventType = attr.slice(2).toLowerCase();
                const el = vnode.el;
                if (el && el.hasAttribute(`data-event-${eventType}`)) {
                    const handlerId = el.getAttribute(`data-event-${eventType}`);
                    GlobalEvents.off(handlerId);
                    el.removeAttribute(`data-event-${eventType}`);
                }
            }
        }
        if (vnode.children) {
            vnode.children.forEach(child => this._cleanupEventAttributes(child));
        }
    }
}

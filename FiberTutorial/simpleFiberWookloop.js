// Import stylesheets
import './style.css';

// Write Javascript code!
const appDiv = document.getElementById('app');
appDiv.innerHTML = `<h1>Linked list traversal</h1>`;

function log(value) {
  const span = document.createElement('span');
  span.textContent = value + ', ';
  appDiv.appendChild(span);
}

const a1 = {name: 'a1'};
const b1 = {name: 'b1'};
const b2 = {name: 'b2'};
const b3 = {name: 'b3'};
const c1 = {name: 'c1'};
const c2 = {name: 'c2'};
const d1 = {name: 'd1'};
const d2 = {name: 'd2'};

a1.render = () => [b1, b2, b3];
b1.render = () => null;
b2.render = () => [c1];
b3.render = () => [c2];
c1.render = () => [d1, d2];
c2.render = () => null;
d1.render = () => null;
d2.render = () => null;

class Node {
    constructor(instance) {
        this.instance = instance;
        this.child = null;
        this.sibling = null;
        this.return = null;
    }
}

function link(parent, elements) {
    if (elements === null) elements = [];

    parent.child = elements.reduceRight((previous, current) => {
        const node = new Node(current);
        node.return = parent;
        node.sibling = previous;
        return node;
    }, null);

    return parent.child;
}

function doWork(node) {
    log(node.instance.name);
    console.log(node.instance.name);
    const children = node.instance.render();
    return link(node, children);
}

const hostNode = new Node(a1);
walk(hostNode);

function walk(o) {
    let root = o;
    let node = o;

    while (true) {
        let child = doWork(node);

        if (child) {
            node = child;
            continue;
        }

        if (node === root) {
            return;
        }

        while (!node.sibling) {
            if (!node.return || node.return === root) {
                return;
            }

            node = node.return;
        }

        node = node.sibling;
    }
}
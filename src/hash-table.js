/* eslint-disable */
/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */
class LimitedArray {
  constructor(limit) {
    // You should not be directly accessing this array from your hash table methods
    // Use the getter and setter methods included in this class to manipulate data in this class
    this.storage = [];
    this.limit = limit;
  }

  checkLimit(index) {
    if (typeof index !== 'number') throw new Error('The supplied index needs to be a number');
    if (this.limit <= index) {
      throw new Error('The supplied index lies out of the array\'s bounds');
    }
    
  }

  each(cb) {
    for (let i = 0; i < this.storage.length; i++) {
      cb(this.storage[i], i);
    }
  }
  // Use this getter function to fetch elements from this class
  get(index) {
    this.checkLimit(index);
    return this.storage[index];
  }

  get length() {
    return this.storage.length;
  }
  // Use this setter function to add elements to this class
  set(index, value) {
    this.checkLimit(index);
    this.storage[index] = value;
  }
}
/* eslint-disable no-bitwise, operator-assignment */
// This is hash function you'll be using to hash keys
// There's some bit-shifting magic going on here, but essentially, all it is doing is performing the modulo operator
// on the given `str` arg (the key) modded by the limit of the limited array
// This simply ensures that the hash function always returns an index that is within the boundaries of the limited array
const getIndexBelowMax = (str, max) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) + hash + str.charCodeAt(i);
    hash = hash & hash;
    hash = Math.abs(hash);
  }
  return hash % max;
};

class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    // Do not modify anything inside of the constructor
  }
  // Wraps the given value in a node object and adds the node to the tail of the list
  // If the list is empty, the new element is considered the tail as well as the head
  // If there is one element in the list before the new element is added, the new element becomes the tail of the list
  addToTail(value) {
    const newNode = {
      next: null,
      value: value,
    };

    if (this.head === null) {
      this.head = newNode;
      this.tail = newNode;
      return;
    }

    this.tail.next = newNode;
    this.tail = newNode;
  }
  // Removes the current head node from the list, replacing it with the next element in the list
  // Returns the value of the removed node
  removeHead() {
    if (this.head === null) return;

    if (this.head.next === null) {
      const value = this.head.value;
      this.head = null;
      this.tail = null;
      return value;
    }
    const value = this.head.value;
    this.head = this.head.next;
    return value;
  }
  // Checks the linked list for the given value
  // Returns true if the the value is found in the list, false otherwise
  contains(value) {
    if (this.head === null) return false;
    const searchLinkedList = (node) => {
      if (node.value === value) return true;
      if (node.next === null) return false;
      return searchLinkedList(node.next);
    };
    return searchLinkedList(this.head);
  }

  // Iterates through the linked list from head to tail
  // Calls cb() on each member
  // Replace cb(node) with cb(node.value) to enact callbacks on member values instead of member objects
  each(cb) {
    if (this.head) {
      const iterateOverNodes = (node) => {
        cb(node);
        if (node.next !== null) iterateOverNodes(node.next);
      }
      iterateOverNodes(this.head);
    }
  }
  
  //Removes elements from the linked list based on truthiness or falsiness of the invoked callback.

  filter(valueToBeFiltered) {
    const filteredList = new LinkedList();
    this.each((node) => {
      if (node.value !== valueToBeFiltered) filteredList.addToTail(node.value);
    });
    return filteredList;
  }
}

class HashTable {
  constructor(limit = 8) {
    this.limit = limit;
    this.storage = new LimitedArray(this.limit);
  }

  resize() {
    this.limit *= 2;
    const oldStorage = this.storage;
    this.storage = new LimitedArray(this.limit);
    oldStorage.each((bucket) => {
      if (!bucket) return;
      bucket.each((node) => {
        this.insert(node.value[0], node.value[1]);
      });
    });
  }
  
  capacityIsFull() {
    let fullCells = 0;
    this.storage.each((bucket) => {
      if (bucket !== undefined) fullCells++;
    });
    return fullCells / this.limit >= 0.75;
  }

  insert(key, value) {
    if (this.capacityIsFull()) this.resize();

    const hash = getIndexBelowMax(key.toString(), this.limit);
    
    if (this.storage.get(hash) === undefined) this.storage.set(hash, new LinkedList());
    const pair = [key, value];
    this.storage.get(hash).addToTail(pair);
  }

  remove(key) {
    const hash = getIndexBelowMax(key.toString(), this.limit);
    if (!this.storage.get(hash)) return;
    const oldBucket = this.storage.get(hash);
    
    const newBucket = new LinkedList();
    while (oldBucket.head !== null) {
      const removedValue = oldBucket.removeHead();
      if (removedValue[0] !== key) newBucket.addToTail(removedValue);
    }
    this.storage.set(hash, newBucket);
  }

  retrieve(key) {
    const hash = getIndexBelowMax(key.toString(), this.limit);
    const hashBucket = this.storage.get(hash);
    let retrieved;
    if (hashBucket) {
      hashBucket.each(node => {
        if (node.value[0] === key) return retrieved = node.value[1];
      });
    }
    return retrieved;
  }
}
 /*
const monsterCup = new HashTable();

monsterCup.insert('Vampire', 'vampireObject');
monsterCup.insert('Star Spawn', 'starSpawnObject');
monsterCup.insert('C\'thonian', 'cthonianObject');
monsterCup.insert('Cultist', 'cultistObject');
monsterCup.insert('Maniac', 'maniacObject');
monsterCup.insert('Dimensional Shambler', 'shamblerObject');
monsterCup.insert('Fire Vampire', 'fireVampireObject');
monsterCup.insert('Ghoul', 'ghoulObject');
monsterCup.insert('Goat Spawn', 'goatSpawnObject');
monsterCup.insert('Mi-Go', 'migoObject');
monsterCup.insert('Dhole', 'dholeObject');
monsterCup.insert('Colour Out of Space', 'colorOOSObject');
monsterCup.insert('Ghost', 'ghostObject');
monsterCup.insert('Elder Thing', 'elderThingObject');
debugger;
monsterCup.remove('Cultist');
monsterCup.remove('Elder Thing');
console.log(monsterCup.retrieve('Ghost'));
monsterCup.remove('Ghost');
console.log(monsterCup.retrieve('Ghost'));
 */
module.exports = HashTable;

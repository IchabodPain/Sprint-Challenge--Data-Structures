## Questions
1. What are the order of insertions/removals for the following data structures?
   - **Stack**
   >Stacks store and retrieve nodes in a FILO/LIFO pattern - First-In, Last-Out. If you stack (push) three objects `first` `second` and `third` in that order, then retrieve (pop) one item, it will be `third`.
   - **Queue**
   >Queues store and retrieve nodes in a FIFO/LILO pattern - First-In, First-Out. If you queue (enqueue) three objects `first` `second` and `third` in that order, then retrieve (dequeue) one item, it will be `first`.
2. What is the retreival time complexity for the following data structures?
   - **Linked List**
   O(n): Linear, because we must check each node in turn before finding the tagrgeted value (at least in the worst-case), but we never recheck a node once it has been checked.
   - **Hash Table**
   O(1): Constant, because the hash function is deterministic and will always tell us exactly which bucket to check for the hashed value by running once. There will still be some additional amount of added time complexity for collision handling.
   - **Binary Search Trees**
2. What are some advantages to using a Hash Tables over an array in JavaScript?
  Hash tables allow for faster retrieval and storage, especially when working with large datasets. By hashing data into buckets, the worst-case time complexity is greatly reduced.

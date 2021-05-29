# Chat List Using LRU Cache


## Objective
To display how LRU Caching works with the help of a chat list application.


## Introduction
The Least Recently Used (LRU) is a common caching strategy. It defines the policy to evict elements from the cache to make room for new elements when the cache is full. There are several caching algorithms to implement a cache eviction policy. LRU is a very simple and commonly used algorithm. The core concept of the LRU algorithm is to evict the oldest data from the cache to accommodate more data. Here is a chat listing application that shows how LRU caching works. 

![Animated help](https://github.com/chinmay-jhunjhunwala/chat-list-using-LRU-cache/blob/main/Animation.gif)

## Implementation
The cache memory size has has been hardcoded as 7, which implies at any point of time at most 7 chats will be displayed.

### Data Structures used:

1. **Arrays**  
    Two arrays have been initialized, which store the *chat names* and *chat messages* respectively.
2. **HashMap**  
    A hashmap helps with O(1) lookup of cached keys.
3. **Doubly Linked List**  
    A doubly linked list helps in maintaining the eviction order and the element at the head of the doubly linked list is the most recently accessed. Any new message will go to the head of the list. 

### Functionalities:

1. **Receive a new message**   
    Whenever a new message is generated using the *RECEIVE NEW MESSAGE* button, the cache memory size is checked. If it is full then the *Least Recently Used* chat is deleted. Then the control flows to either of the following two paths:

    * The chat already exists in the list- In this case it is deleted from its current position and brought to the top of the list.
    * The chat does not exist- In this case, it is simply displayed at the top of the list.

2. **Delete an entire chat history** (Only for version 2.0)  
    If a chat is to be deleted, the chat is simply removed from its current position and the chat list is updated.


## Versions

### Version 1.0

This version is implemented in C++ which runs only across terminal.

Instructions:  
1. Do keep an eye on the *notification* line in the output. It will help you understand better.
2. If you face any issues anywhere or could not remember the command, enter *9* for help.

Drawbacks:  
1. Being implemented across terminal, it makes this version less interactive.
2. Though LRU Caching is achieved in constant time complexity, it takes linear time complexity to print the list across the terminal every time the list is updated.

### Version 2.0

This version uses HTML, CSS and JavaScript to make an interactive web application. The animations have been timed such that it helps the user understand the working of the algorithm.

Instructions:  
1. To receive a new chat, click the *RECEIVE NEW CHAT* button.
2. To delete a chat, first, click the *DELETE CHAT* button, then click any *chat name* of your choice to delete it.
3. While the *DELETE CHAT* option is enabled, the *RECEIVE NEW CHAT* button is disabled.
4. To re-enable the *RECEIVE NEW CHAT* button click the *OK* button.

#include<bits/stdc++.h>
using namespace std;

class LRUCache {
public:
    int sizeOfCache;

    //doubly linked list which stores index of chat names and chat messages as "key" value
    list <int> keyValues;

    // HashMap which holds the keys and address of the Nodes of Doubly LinkedList 
    unordered_map <int,list<int>::iterator> cache;
    
    LRUCache(int capacity) 
    {
        sizeOfCache=capacity;
    }

    list<int>& getChatList()
    {
        return keyValues;
    }
    
    //funtion which is called when a new message arrives
    void newIncomingMessage(int key) 
    {
        //if the chat name is already present, then erase it from its current position
        //so that it can be brought to the head (front) of the linked list
        if(cache.find(key)!=cache.end())
            keyValues.erase(cache[key]);

        //if the cache memory is full then delete the Least Recently Used chat
        //which is present at the tail (back) of the linked list
        else if(keyValues.size()==sizeOfCache)
        {
            cache.erase(cache.find(keyValues.back()));
            keyValues.pop_back();
        } 

        keyValues.push_front(key);//pushes the chat to the front 
        cache[key]=keyValues.begin();//inserts the key into the map with its iterator as value
    }
};

//function to print the initial layout of the application
void displayInitialLayout(){
    cout<<"\n\n                    CHAT-LIST USING LRU CACHE\n";    
    cout<<"___________________________________________________________________________\n";
    cout<<"\nYou can choose any one of the following options as your control command: \n";
    cout<<"\n'1' -> receive a new message\n'0' -> exit application\n'9' -> help\n";
    cout<<"\nEnter control command: ";
}

//function to display the chat-list at any instance 
void displayChatList(list<int> &chatList, vector<string> &chatNames, vector<string> &chatMessages){

    cout<<"\nName                  Message";
    cout<<"\n---------------------------------------------------------\n";

    for(auto i:chatList)
    {
        cout<<chatNames[i]+": "+chatMessages[i]<<endl;
    }

    cout<<"---------------------------------------------------------\n";
}

int main(){

    //initializing the maximum cache storage capacity
    const int cacheCapacity=7;

    //creating an instance of the LRUCache class
    LRUCache* obj = new LRUCache(cacheCapacity);

    displayInitialLayout();

    //storing the chat names in an vector of strings
    vector<string> chatNamesArray = {"Sambit   ", "Abhishek ", "Shalini  ", "Chinmay  ", "Avijit   ", 
    "Nikhil   ", "Siddharth", "Ananya   ", "Piyush   ", "Yash     "};

    //storing the corresponding preview message that will be displayed when a new message arrives
    vector<string> chatMessagesArray = {"Send me your current location...",
    "Congratulations! I'm glad u cud make it...","The G Meet link will be shared...",
    "Let's catch up this weekend...", "I'll call you back in 10 mins...",
    "Do you have any information reg...", "Any ideas which you think would...",
    "Hey, how are you doing?..","If you get any updates, please ke...","Can you suggest me some good places..."};

    while(true){

        int controlVariable;
        cin>>controlVariable;

        //let controlVariable = 9 denote "help"
        //controlVariable = 1 denote a "new message is received"
        //controlVariable = 0 denote the user wants to "close the application"

        //if the user seeks for "help"
        while(controlVariable==9)
        {
            cout<<"\nHere's your help: \n";
            cout<<"\nYou can choose any one of the following options:\n'1' -> receive a new message\n'0' -> exit application\n";
            cout<<"\nEnter control command: ";
            cin>>controlVariable;
        }

        //if the user enters invalid command
        if(controlVariable!=1 && controlVariable!=0)
        {
            cout<<"\nPlease enter correct command!\n";
            cout<<"\nFor help enter '9' \nEnter control command: ";
            continue;
        }

        // cout<<"\n___________________________________________________________________________\n\n";

        //if the user wishes to "close the application"
        //or wishes to stay inside the application
        if(controlVariable==0)
        {
            cout<<"\nThank you!\n";
            break;
        }
        else
        {
            cout<<"\n                    CHAT-LIST USING LRU CACHE\n";
            cout<<"___________________________________________________________________________\n\n";
            //First generating a random index to pick up a random chat
            srand (time(NULL));
            int randomIndex = rand() %  (chatNamesArray.size());

            obj->newIncomingMessage(randomIndex);

            list<int> chatList = obj->getChatList();

            displayChatList(chatList, chatNamesArray, chatMessagesArray);

            cout<<"\nNotification: Received a new message from "<<chatNamesArray[randomIndex]<<endl;
            cout<<"\nFor help enter '9' \nEnter control command: ";
            //the control keeps looping around until the user enters '0' and decides to close the application 
        }
    }
    return 0;
}

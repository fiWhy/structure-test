# Test

## Description

The code allows you to save the ip address of request with additional information for it

1. What would you do differently if you had more time?

   `I would rething the process of insertion and will rewrite the functional pieces to the imperative alternative that is faster`

2. What is the runtime complexity of each function?

```The runtime complexity here is:

SortedPayloadedList:

add - O(n)
slice - O(1)

```

3. How does your code work?

- Whe you try to add ip as a requester the code turns the string ip to the number to lowerage the amount of memory to use.
- After code uses the callback function to help the user add information that should be stored with the ip
- There is the information that user passes and the index of ip position sorted by count of requests stores in Map to prevent another cycle
- Code searches for the first ip (starts from the end) that have more requests (the field to compare should be set on entity creation) and put the request ip next to it, deleted previous insertion before.
- Code updates the data with the actual position of ip in the list.

4. What other approaches did you decide not to pursue?
- Linked list
- Object dictionary

5. How would you test this?
- Run a necessary amount of requests with a random ip

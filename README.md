# ionic4-pwa-ngxs
This project is an example to apply NGXS and PWA in Ionic 4.

Dependencies :
Ionic 4, @ngxs/store : 3.3.4, jasmine : 2.8.8, karma : 3.1.4, typescript : 3.1.6

NGXS pattern :

![alt text](https://blobscdn.gitbook.com/v0/b/gitbook-28427.appspot.com/o/assets%2F-L9CoGJCq3UCfKJ7RCUg%2F-LVrR_Jobt3NVt61AhlH%2F-LVrRb1WdI1nngz9VmFm%2Fdiagram.png?generation=1547118480096027&alt=media)

### Pros:

**-Centralized, Immutable State**

Single source of truth: The data lives in a single store so it is easier to manage, debug and inspect.

**-Immutable State**

State is read-only: All components have to dispatch Action to get or set any data from the Store.
So we can manage all the changes in our system and avoid the side effect. 

**-Share State**

State can share across many components. 
We can minimize the risk of sharing variables, services between multiple components.

**-Components will shorter and cleaner**

Component just need to binding data from the State.
It helps us very easy to maintain Component and Service.

**-Performance**

NGXS doesn't change the State directly, it just returns the new State when has anything changed (it's called Immutable State).

So we can apply ChangeDetectionStrategy.OnPush to maximize performance for Angular App.

>Read more about ChangeDetectionStrategy.OnPush : https://netbasal.com/a-comprehensive-guide-to-angular-onpush-change-detection-strategy-5bac493074a4

**-Testability**

All state updates are handled by pure functions and they are extremely simple to test. 

>Read more about Pure Functions: https://medium.com/@jamesjefferyuk/javascript-what-are-pure-functions-4d4d5392d49c

### Cons:

Not officially supported by Angular or Ionic.
Developer has to spend more time and effort to learn new technology as Redux pattern, NGXS library

### My Conclusion:

Should use NGXS for every angular app with more than 5 screens and we intend to upgrade it later. 
Because NGXS help us easy to go for the complex application.

### NGXS vs NGRX

NGXS implement the same pattern (Redux) as NGRX.
NGXS is simpler and shorter than NGRX.
But NGRX is used on production for many Enterprises out there and has bigger community.


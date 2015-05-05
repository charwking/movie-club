# Firebase

I'm stashing a report of what rules I've got in Firebase here. This should help us keep track of what changes were necessary there for each feature as we add them. It also allows anyone forking this project to setup their own firebase instance to play around with.

In general, my strategy is to keep permissions restrictive until a use-case appears that requires they be readable or writable.

## Rules

```json
{
  "rules": {

    ".read": false,
    ".write": false,

    "clubs": {

      ".read": true,
      ".validate": "newData.hasChildren(['name'])",

      "$clubId": {

        "name": {
          ".validate": "newData.isString() && newData.val().length > 0 && newData.val().length <= 50"
        }
      }
    }
  }
}
```

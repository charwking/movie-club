# Firebase

I'm stashing a report of what rules I've got in Firebase here. This should help us keep track of what changes were necessary there for each feature as we add them. It also allows anyone forking this project to setup their own firebase instance to play around with.

In general, my strategy is to keep permissions restrictive until a use-case appears that requires they be readable or writable.

## Rules

```json
{
  "rules": {

    ".read": false,
    ".write": false,

    "propertyStore": {
      ".read": true,

      "clubName": {
        ".validate": "newData.isString() && newData.val().length > 0 && newData.val().length <= 50"
      }
    },

    "admins": {
      "$userId": {
        ".validate": "newData.isBoolean()"
      }
    },

    "users": {

      ".read": "true",
      ".write": "root.child('admins').child(auth.uid).val() === true",

      "$userId": {

        ".read": "true",
        ".write": "auth.uid === $userId",

        "username": {
          ".validate": "newData.isString() && newData.val().length > 0 && newData.val().length <= 50"
        }
      }
    }
  }
}

```

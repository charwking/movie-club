# Firebase

I'm stashing a report of what rules I've got in Firebase here. This should help us keep track of what changes were necessary there for each feature as we add them. It also allows anyone forking this project to setup their own firebase instance to play around with.

In general, my strategy is to keep permissions restrictive until a use-case appears that requires they be readable or writable.

## Rules

```json
{
  "rules": {

    "adminStore": {

      ".read": true,

      "$userId": {
        ".validate": "newData.isBoolean()"
      }
    },

    "propertyStore": {

      ".read": true,

      "clubName": {
        ".validate": "newData.isString() && newData.val().length > 0 && newData.val().length <= 50"
      }
    },

    "currentMovie": {

      ".read": true,
      ".write": "root.child('adminStore').child(auth.uid).val() === true",

      "name": {
        ".validate": "newData.isString() && newData.val().length > 0"
      }
    },

    "currentMovieUser": {

      ".read": "root.child('adminStore').child(auth.uid).val() === true",
      ".write": "root.child('adminStore').child(auth.uid).val() === true",

      "userId": {
        ".validate": "root.child('users').hasChild(newData.val())"
      }
    },

    "users": {

      ".read": "true",
      ".write": "root.child('adminStore').child(auth.uid).val() === true",

      "$userId": {

        ".read": "true",
        ".write": "auth.uid === $userId",

        "username": {
          ".validate": "newData.isString() && newData.val().length > 0 && newData.val().length <= 50"
        }
      }
    },

    "userMovies": {

      ".read": "root.child('adminStore').child(auth.uid).val() === true",

      "$userId": {
        "movies": {

          ".read": "auth.uid === $userId",
          ".write": "auth.uid === $userId || root.child('adminStore').child(auth.uid).val() === true",

          "$movieId": {

            ".validate": "newData.hasChildren(['name', 'order'])",

            "name": {
              ".validate": "newData.isString() && newData.val().length > 0"
            },

            "order": {
              ".validate": "newData.isNumber()"
            }
          }
        }
      }
    },

    "meetings": {

      ".read": "root.child('adminStore').child(auth.uid).val() === true",
      ".write": "root.child('adminStore').child(auth.uid).val() === true",

      "$meetingId": {

        ".validate": "newData.hasChildren(['date', 'presentUsers', 'selectedMovieName', 'selectedMovieUserId'])",

        "date": {
          ".validate": "newData.isString() && newData.val().matches(/^(19|20)[0-9][0-9][-\\/. ](0[1-9]|1[012])[-\\/. ](0[1-9]|[12][0-9]|3[01])$/)"
        },

        "presentUsers": {
          "$userId": {
            ".validate": "newData.isBoolean()"
          }
        },

        "selectedMovieName": {
          ".validate": "newData.isString() && newData.val().length > 0"
        },

        "selectedMovieUserId": {
          ".validate": "root.child('users').hasChild(newData.val())"
        }
      }
    }
  }
}
```

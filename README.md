# movie-club

Yup, I belong to a movie club with my friends from work. Oh, and most of us are developers. So why are we drawing paper slips from a box to determine which movie we're going to watch next? Lame. This web-app is an attempt to remedy that.

## Questions? Issues? Feedback?

Have a question? Want to suggest a feature? Found a bug? Post a github issue!

## Want to contribute?

Please feel free to fork and submit pull requests! Be warned though, @charwking is a bit OCD, so don't be surprised or offended if he merges your changes and then makes a bunch of changes of his own. :)

## Run locally

Assuming you're on a mac...

* Make sure you've got `npm`, `git`, and `grunt-cli` installed:

    ```
    brew install git
    brew install node
    npm install -g grunt-cli
    ```

* Clone the repo:

    ```
    git clone git@github.com:charwking/movie-club.git
    ```

* cd into the movie-club directory:

    ```
    cd movie-club
    ```
    
* Install dependencies with `npm`:

    ```
    npm install
    ```
    
* Run it!

    ```
    grunt serve
    ```
    
## Firebase

This app currently uses [Firebase](https://www.firebase.com/) to handle authentication and data storage. If you run locally, you'll be connected to the dev firebase instance. Feel free to read/write whatever data you want from there.

If you're adding a feature and need admin access to that, talk to @charwking and he can set you up. Alternatively you could create your own firebase instance and point the app to it. The rules outlined in [FIREBASE.md](https://github.com/charwking/movie-club/blob/master/FIREBASE.md) should prove helpful.

If you need to make adjustments to the firebase rules, update the FIREBASE.md doc as part of your pull request and @charwking will update the PROD firebase instance when merging your changes in.

## Contributors

@charwking
@ttonyan10


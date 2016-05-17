'use strict';

// Create the 'chat' controller
angular.module('chat').controller('ChatController', ['$scope', '$location', 'Authentication', 'Socket',
  function ($scope, $location, Authentication, Socket) {
    // Create a messages array
    $scope.messages = [];
    $scope.score = 0;
    $scope.over = false;
    $scope.counter = 0;
    $scope.scores = [];
    for (var i = 0; i < 9; i++) {

      var x = Math.floor(Math.random()*100) + 1;

      $scope.scores.push(x);
    }

    // If user is not signed in then redirect back home
    if (!Authentication.user) {
      $location.path('/');
    }

    // Make sure the Socket is connected
    if (!Socket.socket) {
      Socket.connect();
    }

    // Add an event listener to the 'chatMessage' event
    Socket.on('chatMessage', function (message) {
      $scope.messages.unshift(message);
    });
    $scope.sendGameText = function () {
      var message = {};
      $scope.over = true;
      if ($scope.messages[0].text === 'go') {
        message = {
          text: $scope.score
        };
      } else if (!isNaN($scope.messages[0].text)) {
        var theirs = $scope.messages[0].text;
        var yours = $scope.messages[0].username;
        if ($scope.score > theirs) {
          message = {
            text: 'hahahahaha ' + yours + ' I pwnd you! ' + $scope.score + ' is better than ' + theirs
          };
        } else if ($scope.score < theirs) {
          message = {
            text: 'boohooboohoo ' + yours + ' I hate you! YOU WIN! ' + $scope.score + ' is lower than ' + theirs
          };
        } else {
          message = {
            text: 'wow it is a tie ' + yours + ' is the same as ' + $scope.score
          };
        }
      } else {
        message = {
          text: 'go'
        };
      }
      Socket.emit('chatMessage', message);
    };

    // Create a controller for BLAST button
    $scope.sendBlast = function () {
      console.log('msg; ', $scope.messages[0].text);
      $scope.counter++;
      var your = this.blastText;
      var yourGuess = $scope.scores[your - 1];
      console.log('yourGuess:', yourGuess);
      var myCard = Math.floor(Math.random()*10) + 1;
      var message = {};
      $scope.score = $scope.score + yourGuess;
      message = {
        text: 'I made my ' + $scope.counter + ' guess'
      };
      // } else if (yourGuess === myCard) {
      //   $scope.score = $scope.score + 5
      //   message = {
      //     text: myCard + ' (my card) ' + ' is the same as ' + yourGuess + ' SO YOU WIN JACKPOT!!!!'
      //   };
      // } else {
      //   $scope.score = $scope.score - 3
      //   message = {
      //     text: myCard + ' (my card) ' + ' is higher than ' + yourGuess +' SO YOU LOSE!'
      //   };
      // }
      Socket.emit('chatMessage', message);
    };

    // $scope.guessBlast = function () {
    //   var dealerUp = Math.floor(Math.random()*13) + 1
    //   var dealerDown = Math.floor(Math.random()*13) + 1
    //   var message = {
    //     text: dealerUp
    //   };
    //   Socket.emit('chatMessage', message);
    // };

    // Create a controller method for sending messages
    $scope.sendMessage = function () {
      // Create a new message object
      var message = {
        text: this.messageText
      };

      // Emit a 'chatMessage' message event
      Socket.emit('chatMessage', message);

      // Clear the message text
      this.messageText = '';
    };

    // Remove the event listener when the controller instance is destroyed
    $scope.$on('$destroy', function () {
      Socket.removeListener('chatMessage');
    });
  }
]);

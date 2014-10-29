Template.postEdit.events({
  'submit form': function (e) {
    e.preventDefault();

    var currentPostId = this._id;
    var postProperties = {
      url: $(e.target).find('[name=url]').val(),
      title: $(e.target).find('[name=title]').val()
    };

    Meteor.call('postUpdate', currentPostId, postProperties, function (error, result) {
      // display the error to the user and abort
      if (error)
        return alert(error.reason);

      // show this result but route anyway
      if (result.postExists)
        alert("This link has already been posted");

      Router.go('postPage', {_id: result._id});
    });
    
    // Posts.update(currentPostId, {$set: postProperties}, function(error) {
    //   if (error) {
    //     // display the error to the user
    //     alert(error.reason);
    //   } else {
    //     Router.go('postPage', {_id: currentPostId});
    //   }
    // });
  },
  'click .delete': function(e) {
    e.preventDefault();

    if (confirm("Delete this post?")) {
      var currentPostId = this._id;
      Posts.remove(currentPostId);
      Router.go('postsList');
    }
  }
});
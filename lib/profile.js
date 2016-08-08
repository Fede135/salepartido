Meteor.methods({
  sendEmail: function(doc) {
    // Important server-side check for security and data integrity
    check(doc, Schema.users);

    // Build the e-mail text
    var text = "Name: " + doc.name + "\n\n"
            + "Email: " + doc.email + "\n\n\n\n";

    this.unblock();

    // Send the e-mail
    Email.send({
        to: "test@example.com",
        from: doc.email,
        subject: "Website Contact Form - Message From " + doc.name,
        text: text
    });
  }
});
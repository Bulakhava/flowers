class Comment{
 constructor(params){
    this.id = params._id;
    this.itemId = params.itemId;
    this.userId = params.userId;
    this.userName = params.userName;
    this.text = params.text;
    this.date = params.date;
  }

};
export default Comment;

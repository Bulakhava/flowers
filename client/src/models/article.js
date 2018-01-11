class Article{
  constructor(params){
    this.id = params._id;
    this.title = params.title;
    this.img = params.img;
    this.text = params.text;
    this.date = params.date;
  }

  cropText() {

    let text = this.text.split(' ');
    if(text.length > 50){
      this.text = this.text.split(' ').splice(0,50).join(' ') + ' ...';
    }
  }

};

export default Article;

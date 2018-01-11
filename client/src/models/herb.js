class Herb{
  constructor(params){
    this.id = params._id;
    this.alias = params.alias;
    this.name = params.name;
    this.description = params.description;
    this.pict = [];
    params.pict.forEach(el => {
      this.pict.push(`src/assets/img/flowers/${this.alias}/${el}`);
    });
  }
};
export default Herb;
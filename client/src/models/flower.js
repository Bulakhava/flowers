import Herb from './herb.js';

class Flower extends Herb{
  constructor(params){
    super(params);
    this.img = params.img;
    this.isSorts = params.isSorts;
  }
};

export default Flower;

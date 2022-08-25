import React, {Fragment, Component} from 'react';
import './App.css';
import { Table } from 'reactstrap';
import Rating from 'react-rating';
import { Card, CardImg, CardText, CardBody, CardLink,
  CardTitle, CardSubtitle, Button } from 'reactstrap';

class SingleItem extends Component {

  constructor(props){
    super(props);
    this.state = {
      collapsed: true
    }
  }

  consoleProps = () =>{
   
  }

  addToCard = (id) =>{
    this.props.callbackAddActiveToCart(id);
  }

  compareItems = (id) =>{
    this.props.callbackAddActiveToComparison(id);
  }  

  render(){
    return (
      <Fragment>
      <Card style={{marginBottom: "1rem"}} className="card-large">
        <div className="card-large-image">
          <img width="100%" src={this.props.activeItem.photo} alt="Card image cap" />                  
        </div>
        <CardBody className="card-large-text">
          <div>
            <CardTitle>{this.props.activeItem.name}</CardTitle>
            <CardText>Производитель: {this.props.activeItem.manufacturer}</CardText>
            <CardText>Гарантия: 12мес</CardText>
            <Rating className="rating-stars"
                  initialRating={this.props.activeItem.rating}  
                  readonly  
                  emptySymbol="far fa-star fa-1x"
                  fullSymbol="fas fa-star fa-1x" />
            <CardText className="price-textbox">Цена: {this.props.activeItem.price} руб.</CardText>                  
          </div>
          <Button color="primary"  onClick={this.addToCard.bind(this, this.props.activeItem.id)} block><i className="fas fa-shopping-basket"></i> Добавить товар в корзину</Button>
        </CardBody>
      </Card>        
        <Table bordered striped>
          <tbody>
            <tr>
              <th className="w-50" scope="row">Производитель</th>
              <td className="w-50">{this.props.activeItem.manufacturer}</td>
            </tr>
            <tr>
              <th className="w-50" scope="row">Тип</th>
              <td className="w-50">{this.props.activeItem.type}</td>
            </tr>
            <tr>
              <th className="w-50" scope="row">Кол-во кадров в секунду(видео)</th>
              <td className="w-50" >{this.props.activeItem.max_FPS_video}</td>
            </tr>
            <tr>
              <th className="w-50" scope="row">Кол-во кадров в секунду(фото)</th>
              <td className="w-50" >{this.props.activeItem.max_FPS_photo}</td>
            </tr>            
            <tr>
              <th className="w-50" scope="row">Тип питания</th>
              <td className="w-50" >{this.props.activeItem.battery_type}</td>
            </tr>
            <tr>
              <th className="w-50" scope="row">Макс.разрешение</th>
              <td className="w-50" >{this.props.activeItem.max_resolution}</td>
            </tr>
            <tr>
              <th className="w-50" scope="row">Мин.чувствительность</th>
              <td className="w-50">{this.props.activeItem.min_sensitivity}</td>
            </tr>
            <tr>
              <th className="w-50" scope="row">Макс.чувствительность</th>
              <td className="w-50">{this.props.activeItem.max_sensitivity}</td>
            </tr>
            <tr>
              <th className="w-50" scope="row">Wi-Fi</th>
              <td className="w-50">{this.props.activeItem.wi_fi}</td>
            </tr>
            <tr>
              <th className="w-50" scope="row">Поддержка карт памяти</th>
              <td className="w-50">{this.props.activeItem.card_support}</td>
            </tr>
            <tr>
              <th className="w-50" scope="row">Тип матрицы</th>
              <td className="w-50">{this.props.activeItem.matrix_type}</td>
            </tr>
            <tr>
              <th className="w-50" scope="row">Размер матрицы</th>
              <td className="w-50">{this.props.activeItem.matrix_size}</td>
            </tr>                                                                                                 
          </tbody>
        </Table>        
      </Fragment>
    );
  }
}

export default SingleItem;

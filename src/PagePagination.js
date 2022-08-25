import React, {Component} from 'react';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';

class PagePagination extends Component {

  constructor(props){
    super(props);
    this.state = {
      currentId: 0,
      activeState: []
    }
  }

  componentDidMount(){
    let pageNumbers = [];
    for (let i = 1; i <= Math.ceil(this.props.items.length / this.props.visible); i++) {
        pageNumbers.push(i);
    }
    this.setClasses(pageNumbers)
  }

  setClasses = (params) =>{
    let activeState = [];
    for (var i = 0; i < params.length; i++) {
      if (i == 0) {
        activeState.push("active"); 
      }
      else{
        activeState.push(" ")
      }
    }
    this.setState({
      activeState
    })
  }



  selectPage = (id, e) =>{
    let itemId = e.currentTarget.getAttribute("data-index");
    this.currentPage(itemId)       
  }

  currentPage = (id) =>{
    console.log(id);
    let activeState = this.state.activeState.slice(); 
    activeState.fill(' ');
    activeState[id] = 'active';
    this.setState({activeState}, () => this.showItems(id))
  }




  showItems = (id) =>{
    let items = this.props.items.slice();
    let start = id * this.props.visible;
    this.props.callbackFromApp(start);
    this.setState({
      currentId: id
    })
  }

  previousPage = (e) =>{
    if (this.state.currentId > 0) {
      let itemId = e.currentTarget.getAttribute("data-index");
      let activeState = this.state.activeState; 
      let currentId = this.state.currentId - 1;
      this.setState({
        currentId,
        activeState
      }, () => this.currentPage(currentId))
    }
  }

  nextPage = (e) =>{
    let maxLength = Math.ceil(this.props.items.length / this.props.visible)
    if (this.state.currentId < maxLength - 1) {
      let itemId = e.currentTarget.getAttribute("data-index");
      let activeState = this.state.activeState;
      let currentId = Number(this.state.currentId) + 1;
      this.setState({
        currentId,
        activeState
      }, () => this.currentPage(currentId))
    }
  }

  firstPage = () =>{
    this.setState({
      currentId: 0
    }, () => this.currentPage(0))
  }

  lastPage = () =>{
    let maxId = Math.ceil(this.props.items.length / this.props.visible);
    this.setState({
      currentId: maxId - 1
    }, () => this.currentPage(this.state.currentId) )
  }

  consoleState = () =>{


  }

  render() {
    let pageNumbers = [];
    let activeState = this.state.activeState;
    for (let i = 1; i <= Math.ceil(this.props.items.length / this.props.visible); i++) {
        pageNumbers.push(i);
    }    

    return (
      <Pagination aria-label="Page navigation example" style={{ marginTop: '2rem' }}>
      <PaginationItem >
          <PaginationLink  first href="#" onClick={this.firstPage} />
        </PaginationItem>
        <PaginationItem >
          <PaginationLink onClick = {this.previousPage} previous href="#" />
        </PaginationItem>
        {pageNumbers.map((item, index) =>
          <PaginationItem  key={index} className={this.state.activeState[index]}>
            <PaginationLink data-index={index} onClick ={this.selectPage.bind(this, index)} >
              {item}
            </PaginationLink>
          </PaginationItem>
        )}
        <PaginationItem>
          <PaginationLink onClick = {this.nextPage} next href="#" />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink last href="#" onClick={this.lastPage} />
        </PaginationItem>
      </Pagination>
    );
  }
}

export default PagePagination
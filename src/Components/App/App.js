import React from 'react';

import './App.css';

import PostBox from '../PostBox/PostBox'
import Najebometr from '../Najebometr/Najebometr'
import SearchBar from '../SearchBar/SearchBar'
import SearchResults from '../SearchResults/SearchResults'
import postsDatabase from '../../posts/postsDatabase'

class App extends React.Component {
  constructor(props) {
    super(props);
    let random = Math.floor(Math.random() * postsDatabase.posts.length);
    this.state = {
      name: 'Tyna Górska',
      imgUrl: 'https://scontent-waw1-1.xx.fbcdn.net/v/t1.0-1/13241312_1812786392282660_1792011237390627776_n.jpg?_nc_cat=101&_nc_sid=dbb9e7&_nc_ohc=DB1wtOu37UUAX-6Tu-c&_nc_ht=scontent-waw1-1.xx&oh=87006017b58541c87bf6bd00a1fa890c&oe=5E96948D',
      backgroundImgUrl: 'https://scontent-waw1-1.xx.fbcdn.net/v/t31.0-8/14434877_1867824316778867_6354816713573810843_o.jpg?_nc_cat=101&_nc_sid=dd9801&_nc_ohc=9sq93gh2OKUAX_wQMgg&_nc_ht=scontent-waw1-1.xx&oh=63c20728367f0d25b935bc4974a59034&oe=5E962FC8',
      posts: postsDatabase.posts,
      currentPost: postsDatabase.posts[random],
      currentPostsDate: postsDatabase.posts[random].date,
      onWhatDays: [],
      randomIndex: 0,
      najebometr: 0,
    }
    
    this.handleClick            = this.handleClick.bind(this)
    this.getPost                = this.getPost.bind(this)
    this.formatDate             = this.formatDate.bind(this)
    this.getRandomIndex         = this.getRandomIndex.bind(this)
    this.playAudio              = this.playAudio.bind(this)
    this.countTheMostFrequent   = this.countTheMostFrequent.bind(this)
    this.getDays                = this.getDays.bind(this)
    this.getAllDays             = this.getAllDays.bind(this)
    this.getOccurrences          = this.getOccurrences.bind(this)
    this.setPost                = this.setPost.bind(this)
    this.getYears               = this.getYears.bind(this)
  }

  handleClick() {
    this.getRandomIndex();
    this.updateDate()
  }

  getRandomIndex() {
    let postsLength = this.state.posts.length
    this.setState({ randomIndex: Math.floor(Math.random() * postsLength), 
      currentPost: postsDatabase.posts[this.state.randomIndex]  
    })
  }

  getPost() {
    this.setState({ currentPost: postsDatabase.posts[this.state.randomIndex]})
  }

  updateDate() {
    this.setState({ currentPostsDate: postsDatabase.posts[this.state.randomIndex].date})
    this.formatDate(this.state.currentPostsDate);
  }

  formatDate(newDate) {
    //newDate = this.state.currentPostsDate;
    const monthNames = ["Styczeń", "Luty", "Marzec", "Kwiecień", "Maj", "Czerwiec", "Lipiec", "Sierpień", "Wrzesień", "Październik", "Listopad", "Grudzień"];
  
    
    newDate = newDate.split('-')

    const day = newDate[2]
    const month = monthNames[Number(newDate[1]-1)]
    const year = newDate[0]
    let fullYear = `${day} ${month} ${year}`

    return fullYear
  }

  playAudio(url) {
    new Audio(url).play()
  }

  countTheMostFrequent() {
    let posts = this.state.posts;
    let array = posts.map(date => date.date);
    let counter = 0;
    let max = 0;
    let mostFrequent;

    for (let i = 0; i < array.length; i++) {
      for (let j = 0; j < array.length; j++) {
        if(array[i] === array[j]){
          counter++
        }
      }
      if (counter > max) {
        mostFrequent = array[i]
        max = counter;
        counter = 0
      }
      counter = 0;
    }

    mostFrequent = this.formatDate(mostFrequent)
    this.setState({najebometr: mostFrequent})
  }

  getDays(elements, isOrigin) {  
    let array = elements.map(element => element.date)
    if(!isOrigin) {
      array = elements.map(element => element)
    } 

    let dates = []
    
    for (let i = 0; i < array.length; i++) {
        if(!dates.includes(array[i])) {
          dates.push(array[i])
      }
    }

    return dates
  }

  getYears() {
    let posts = this.state.posts
    let array = posts.map(post => post.date)
    let dates = []
    
    for (let i = 0; i < array.length; i++) {
        if(!dates.includes(array[i])) {
          dates.push(array[i])
      }
    }

    return dates
  }

  getAllDays() {
    let posts = this.state.posts
    let array = posts.map(post => post.date)

    return array
  }

  getOccurrences(element) {
    let arr = this.getAllDays()
    let occurrences = 0
    for (let i = 0; i < arr.length; i++) {
      if(arr[i] === element) {
        occurrences++
      }
    }

    return occurrences
  }

  convertToArray(element, char) {
    element = element.split(char);

    return element;
  }

  setPost() {
    let posts = this.state.posts
    posts = posts.map(post => post)

    //this.setState({ currentPost: })
  }

  componentDidMount = () => {
    this.countTheMostFrequent()
    this.setPost()
    
    this.setState({onWhatDays: this.getDays(this.state.posts, true)})
  }
  
  render() {
    return (
      <div className="AppBox">
        <h1 className="header">Just You and I</h1>
        <div className="grid">

          <div className="container">
            <button className="button" onClick={this.handleClick}>
                Następny, proszę!
            </button>
            <div className="stats">
              <Najebometr mostFrequent={this.state.najebometr}
                onWhatDays={this.state.onWhatDays}
                formatDate={this.formatDate}
                getOccurrences={this.getOccurrences}/>
            </div>
          </div>
          
          <div className="container">
            <PostBox name={this.state.nfame}
              imgSrc={this.state.imgfUrl}
              post={this.state.currentPost}
              date={this.state.currentPostsDate}
              formatDate={this.formatDate}/>
            
            <SearchBar posts={this.state.posts}
              convertToArray={this.convertToArray}
              getDays={this.getDays}/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;

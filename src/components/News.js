import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";


export class News extends Component {
    static defaultProps = {
        country : 'us',
        pageSize: 8,
        category: 'general'
    }

    static propTypes = {
        country: PropTypes.string,
        pageSize : PropTypes.number,
        category: PropTypes.string
    }
    capitalizeFirstLetter =(string)=>{
        return string.charAt(0).toUpperCase()+string.slice(1)
    }
//    articles =[
//     {
//       "source": {
//         "id": "abc-news-au",   
//         "name": "ABC News (AU)"
//       },
//       "author": "Kema Johnson",
//       "title": "Witnesses stunned as small meteor lights up sky over parts of Western Australia",
//       "description": "A bright light that lit up the sky over parts of Western Australia was most likely from a small meteor not much bigger than a cricket ball, experts say.",
//       "url": "https://www.abc.net.au/news/2025-05-11/small-meteor-lights-up-wa-sky/105279490",
//       "urlToImage": "https://live-production.wcms.abc-cdn.net.au/6d7a1c8c0e4b8d909673a42489977896?impolicy=wcms_watermark_news&cropH=290&cropW=515&xPos=0&yPos=53&width=862&height=485&imformat=generic",
//       "publishedAt": "2025-05-11T07:24:29Z",
//       "content": "A bright light that lit up the sky over parts of Western Australia was most likely from a small meteor, according to experts.\r\nMany early risers from Perth to the Goldfields took to social media on S… [+3081 chars]"
//     },
//     {
//       "source": {
//         "id": "abc-news-au",
//         "name": "ABC News (AU)"
//       },
//       "author": "ABC News",
//       "title": "Australian Test cricketer Bob Cowper dies aged 84",
//       "description": "Bob Cowper, who recorded the first Test triple century in Australia, dies at the age of 84.",
//       "url": "https://www.abc.net.au/news/2025-05-11/australian-cricket-bob-cowper-dies-age-84/105279410",
//       "urlToImage": "https://live-production.wcms.abc-cdn.net.au/371bbc2c837c3f70b593725f602b36e9?impolicy=wcms_watermark_news&cropH=2519&cropW=4479&xPos=0&yPos=1082&width=862&height=485&imformat=generic",
//       "publishedAt": "2025-05-11T03:52:25Z",
//       "content": "Cricket Australia (CA) has paid its respect to former Test player Bob Cowper, who has died aged 84.\r\nFormer Australia Test opener Keith Stackpole dies, aged 84, after a dynamic career including seven… [+1341 chars]"
//     },
//     {
//       "source": {
//         "id": "espn-cric-info",
//         "name": "ESPN Cric Info"
//       },
//       "author": null,
//       "title": "PCB hands Umar Akmal three-year ban from all cricket | ESPNcricinfo.com",
//       "description": "Penalty after the batsman pleaded guilty to not reporting corrupt approaches | ESPNcricinfo.com",
//       "url": "http://www.espncricinfo.com/story/_/id/29103103/pcb-hands-umar-akmal-three-year-ban-all-cricket",
//       "urlToImage": "https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1099495_800x450.jpg",
//       "publishedAt": "2020-04-27T11:41:47Z",
//       "content": "Umar Akmal's troubled cricket career has hit its biggest roadblock yet, with the PCB handing him a ban from all representative cricket for three years after he pleaded guilty of failing to report det… [+1506 chars]"
//     },
//     {
//       "source": {
//         "id": "espn-cric-info",
//         "name": "ESPN Cric Info"
//       },
//       "author": null,
//       "title": "What we learned from watching the 1992 World Cup final in full again | ESPNcricinfo.com",
//       "description": "Wides, lbw calls, swing - plenty of things were different in white-ball cricket back then | ESPNcricinfo.com",
//       "url": "http://www.espncricinfo.com/story/_/id/28970907/learned-watching-1992-world-cup-final-full-again",
//       "urlToImage": "https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1219926_1296x729.jpg",
//       "publishedAt": "2020-03-30T15:26:05Z",
//       "content": "Last week, we at ESPNcricinfo did something we have been thinking of doing for eight years now: pretend-live ball-by-ball commentary for a classic cricket match. We knew the result, yes, but we tried… [+6823 chars]"
//     }
//   ]
    constructor(props){
        super(props)
        console.log("I am a constructor")
        this.state = {
            page:1,
            articles : [],
            loading : true  ,
            totalResults : 0
        }
        document.title = `${this.capitalizeFirstLetter(this.props.category)} - NewsMonkey`; 
    }

    async updateNews(){
        this.props.setProgress(10);
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({loading:true});  
        let data = await fetch(url);
        this.props.setProgress(30);
        let parsedData = await data.json();
        this.props.setProgress(70);
        console.log(parsedData);
        this.setState({articles: parsedData.articles, totalResults: parsedData.totalResults , 
            loading:false
        });
        this.props.setProgress(100);
    }

    async componentDidMount(){
        // console.log("cdm");
        // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=1&pageSize=${this.props.pageSize}`;
        // this.setState({loading:true});  
        // let data = await fetch(url);
        // let parsedData = await data.json();
        // console.log(parsedData);
        // this.setState({articles: parsedData.articles, totalResults: parsedData.totalResults , 
        //     loading:false
        // });
        this.updateNews();
    }

    handlePrevClick = async ()=>{
        //  let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=${this.props.apiKey}&page=${this.state.page-1}&pageSize=${this.props.pageSize}`;
        //  this.setState({loading:true});
        //  let data = await fetch(url);
        //  let parsedData = await data.json();
        //  console.log(parsedData);
         
        //  this.setState({
        //      page: this.state.page - 1,
        //      articles: parsedData.articles,
        //      loading:false
        //     }) 
        this.setState({page:this.state.page-1})
        this.updateNews();
    }

    handleNextClick = async ()=>{
        // if((!this.state.page +1> Math.ceil(this.state.totalResults/this.props.pageSize))){}
        //     let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=${this.props.apiKey}&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
        //     this.setState({loading:true});
        //     let data = await fetch(url);
        //     let parsedData = await data.json();
            
        //     console.log(parsedData);
            
        //     this.setState({
        //         page: this.state.page +1,
        //         articles: parsedData.articles,
        //         loading:false
        //     })
        this.setState({page:this.state.page+1})
        this.updateNews();  
    }

    fetchMoreData = async () => {
        this.setState({page: this.state.page+1});
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);
        this.setState({
            articles: this.state.articles.concat(parsedData.articles), 
            totalResults: parsedData.totalResults
        },()=>{
            console.log("Articles:", this.state.articles.length, "Total:", this.state.totalResults);

        });
    };

  render() {
    return (
      <>
        <h1 className="text-center">NewsMonkey - Top {this.capitalizeFirstLetter(this.props.category)} Headlines</h1>
        {this.state.loading && <Spinner/>}  
          <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner/>}
        >
        <div className="container">
        <div className="row">
        {this.state.articles.map((element,index)=>{
            return <div className="col-md-4" key={element.url+index} >
                <NewsItem title={element.title?element.title:""} description={element.description?element.description:""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
            </div>})}
        </div>
        </div>
        </InfiniteScroll>   
         {/* <div className="container d-flex justify-content-between">
            <button style={{visibility: this.state.page <=1 ?"hidden": "visible"}} type='button' className='btn btn-dark' onClick={this.handlePrevClick}>&larr; Previous</button>
            <button disabled={this.state.page+1>Math.ceil(this.state.totalResults/this.props.pageSize)} type='button' className='btn btn-dark' onClick={this.handleNextClick}>Next &rarr;</button>
        </div> */}
        </>
    )
  }
}

export default News;
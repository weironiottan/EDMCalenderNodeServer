<div id="top"></div>

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]



<!-- PROJECT LOGO -->
<br />

<h3 align="center">EDM Events API Server</h3>

  <p align="center">
    This Node API server scrapes clubs in vegas that host edm events. Want to find what date a particular DJ is play at which Clubs?
    You can search by Club Name, Artist Name, Date or just get all the events for all clubs that play EDM Music
    <br />
    <a href="https://github.com/weironiottan/FindEDMEventsAPIServer"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://salty-sea-11177.herokuapp.com/">View Demo</a>
    ·
    <a href="https://github.com/weironiottan/FindEDMEventsAPIServer/issues">Report Bug</a>
    ·
    <a href="https://github.com/weironiottan/FindEDMEventsAPIServer/issues">Request Feature</a>
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started/Usage</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

<br />

<!-- ABOUT THE PROJECT -->
## About The Project
This Node API server scrapes clubs in Vegas that host edm events. I personally love EDM and I live close enough to Vegas to be able
see the different shows year round.  There was one problem though, it is really hard to find out what club in Vegas plays which  DJ.
As an example I really like Martin Garrix however I didn't know he was playing at a certain date in Vegas. It was not on his website,
neither on any of the other aggregate EDM Las Vegas Websites. I even tried a couple of APIs such as ticket master or bands in town. 
Nothing consistently found all the events a DJ would play in Vegas, unless I physically visited all the different casino club websites


There had to be a better way. So basically I created scripts to scrape each of the club websites using Cheerio. I then collected all the relevant
info and sent it over to mongoDB, and then automatically re-check the websites every 24 hrs. I then created different API endpoints listed in the docs
in order to filter based on the different info needed for a potential website.

Currently the API collects info from the following clubs:
    AYU Nights/Day, Zouk, XS, Omnia, Hakassan, Omnia, Wet Republic, Encore Beach Night/Day, Jewel, Liquid Pool Lounge 

A current version of this server is deployed on a heroku app and you are more then welcome to access it and use it for any purpose. As of now 
I don't have any restrictions for the API, meaning there are no API Keys needed just the url and the  right API Endpoint. This might change in the
future if there are too many requests and I run out of the free allotment on Heroku. However you could literally fork this project and deploy it to
Heroku and have your own custom server. The only thing I request is that you give credit where credit is due :) 

Don't be shy, if you like it, send me an email! If you don't like it, send me an email! for anything else, send me an email!

[![Product Name Screen Shot][product-screenshot]](https://example.com)



### Built With

* [Node.js](https://nodejs.org/en/)
* [Express.js](https://expressjs.com/)
* [Cheerio](https://www.npmjs.com/package/cheerio)
* [Mongoose](https://mongoosejs.com/docs/)
* [MongoDB](https://www.mongodb.com/)
* [Heroku](https://www.heroku.com/)


<p align="right">(<a href="#top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

Here are the listed API that can be consumed:

 1. Serves as a Base Path for all query, nothing is returned.
    ```sh
    /find-edm

    Ex. https://salty-sea-11177.herokuapp.com/find-edm
    ```

 2. Serves all the events in the stored collection.
    ```sh
    /find-edm/all-events

    Ex. https://salty-sea-11177.herokuapp.com/find-edm/all-events
    ```

 3. Find queries based on: key:value pairs of the schema object
    ```sh
    /find-edm/event?<query>=<query>

    Ex. https://salty-sea-11177.herokuapp.com/find-edm/event?artistname=martin
    ```

 4. Find queries based on: clubname
    ```sh
    /find-edm/clubname/<query>

    Ex. https://salty-sea-11177.herokuapp.com/find-edm/clubname/zouk
    ```

 5. Find queries based on: artistname
    ```sh
    /find-edm/artistname/<query>

    Ex. https://salty-sea-11177.herokuapp.com/find-edm/artistname/steve aoki
    ```


 6. Find queries based on: artistimageurl
    ```sh
    /find-edm/artistimageurl/<query>

    Ex. https://salty-sea-11177.herokuapp.com/find-edm/artistimageurl/url
    ```

 7. Find queries based on: eventdate
    ```sh
    /find-edm/eventdate/<query>

    Ex. https://salty-sea-11177.herokuapp.com/find-edm/eventdate/Jan
    ```

 8. Find queries based on: ticketurl
    ```sh
    /find-edm/ticketurl/<query>

    Ex. https://salty-sea-11177.herokuapp.com/find-edm/ticketurl/url
    ```

 Example of the JSON Schema Object:

    ```
    clubname: xs,
    artistname: xs,
    artistimageurl: https://venueeventartist.com/imateq/event/446/1115/685652/500SC0/685689.jpeg,
    eventdate: 2021-03-19T07:00:00.000Z,
    ticketurl: https://www.wynnsocial.com/event/EVE111500020220319/art-of-the-wild/
    ```



### Prerequisites

This is an example of how to list things you need to use the software and how to install them.
* npm
  ```sh
  npm install npm@latest -g
  ```

### Installation
1. Clone the repo
   ```sh
   git clone https://github.com/weironiottan/FindEDMEventsAPIServer.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```

<p align="right">(<a href="#top">back to top</a>)</p>




<!-- ROADMAP -->
## Roadmap

- Add All of the known clubs in Vegas, 
- Grab link for guest list for all events
- Grab Link to pre-sale and ticket links for all events
- Notification integration based on what artist is in town and send it via email/sms
- Create a Proof of Concept Website that harnesses this API

See the [open issues](https://github.com/weironiottan/FindEDMEventsAPIServer/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- CONTACT -->
## Contact


Project Link: [https://github.com/weironiottan/FindEDMEventsAPIServer](https://github.com/weironiottan/FindEDMEventsAPIServer)

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- ACKNOWLEDGMENTS -->
## Acknowledgments
For the Readme template:
* [othneildrew](https://github.com/othneildrew/Best-README-Template)


<p align="right">(<a href="#top">back to top</a>)</p>



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/weironiottan/FindEDMEventsAPIServer.svg?style=for-the-badge
[contributors-url]: https://github.com/weironiottan/FindEDMEventsAPIServer/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/weironiottan/FindEDMEventsAPIServer.svg?style=for-the-badge
[forks-url]: https://github.com/weironiottan/FindEDMEventsAPIServer/network/members
[stars-shield]: https://img.shields.io/github/stars/weironiottan/FindEDMEventsAPIServer.svg?style=for-the-badge
[stars-url]: https://github.com/weironiottan/FindEDMEventsAPIServer/stargazers
[issues-shield]: https://img.shields.io/github/issues/weironiottan/FindEDMEventsAPIServer.svg?style=for-the-badge
[issues-url]: https://github.com/weironiottan/FindEDMEventsAPIServer/issues
[license-shield]: https://img.shields.io/github/license/weironiottan/FindEDMEventsAPIServer.svg?style=for-the-badge
[license-url]: https://github.com/weironiottan/FindEDMEventsAPIServer/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/chrisgabrielsson
[product-screenshot]: images/screenshot.jpeg
© 2021 GitHub, Inc.
Terms
Privacy
Security
Status
Docs
Contact GitHub
Pricing
API
Training
Blog
About
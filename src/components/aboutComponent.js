import React from 'react';
import { Breadcrumb, BreadcrumbItem, Card, CardBody, CardHeader, Media } from 'reactstrap';
import { Link } from 'react-router-dom';





function About() {

    return(
        <div className="container">
            <div className="row">
                <Breadcrumb>
                    <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                    <BreadcrumbItem active>About</BreadcrumbItem>
                </Breadcrumb>
                <div className="col-12">
                    <h3>About</h3>
                    <hr />
                </div>                
            </div>
            <div className="row row-content">
                <div className="col-12 col-md-10">
                    <h2>Overview</h2>
                    <p>Teamwork is an internal social network for employees of an organization. The goal of this
                        application is to facilitate more interaction between colleagues and promote team bonding.</p>

                    <h2>Project review</h2>
                    <p>First if you don't have time to read this lengthy piece, check the end of this review for login details.</p>
                    <p>TeamWork is the capstone project of the 2019 Facebook sponsored #DevCTrainingWithAndela. The program spanned 3 months, starting September 2019 till 30th November 2019,
                    the capstone project had 1 month ending November 30 2019.
                    I thought i'd do a review of my implementation since there is a marked departure from the project specification issued by Andela. 
                    I shall start with the digressions, by critiquing the project spec, followed by issues i am yet to resolve, and finally give pointers to some
                    sweet sweet enhancements i wish not that you miss. Perhaps those are stuffs a project management board deals with, but we might as well sort them here in case 
                    you don't make it to my project repos. Let's start in the beninging, shall we? Wait! You didn't miss that infamous "beninging" humor, did you? :).</p>
                    
                    <h5>Digressions</h5>
                    <ul>
                    <li> The project spec has been hailed by the cohorts as being professionally put together, and i couldn't agree more. However, on starting the frontend, some requirements made less sense,
                    no offence meant here, but i reckon these are stuffs one sorts with a project manager in the real world. For example, in the create-user API, on succesfully 
                    registering a new user, we are required to return a response with a token. That doesn't make sense to the admin, nor the registered user, who only needs his login 
                    details emailed to him. </li>
                    <li>
                    The getItemById (where a user can view a single feed onClick) endpoints pose enormous redundancies that if avoided, could save huge time to first paint, and time to interactive.
                    To my team lead, i would suggest a cleaner method that saves network request time. Here, since we have items in the feed already, when clicked, a filter function renders clicked item in
                    an array without any network request, while we go fetch comments with clicked itemId from the network, to render in another array below. Even though i haven't seen the twitter code for it, I bet that is how twitter 
                    implements its "view single tweet and comments".
                    </li>
                    <li> Apparently, most of the spec shortcomings are with the specified response data, where it isn't the API design. For the feed API, following the database design
                    which required seperate image and article tables, to get feed, one must pull off some SQL query that leaves one panting for breath, whilst rendering the query non performant if scaled up.
                    Let's see how that went for me.
                       
                    <p>
                    <sub>
                        const soCalledDeftQuery =   `WITH A as (SELECT i.imageid as itemid, i.createdon, i.title, i.imageurl as item, i.userid, u.firstname as author 
                                        FROM images i JOIN users u ON i.userid = u.userid UNION ALL SELECT a.articleid, a.createdon, a.title, a.article, a.userid, u.firstname 
                                        FROM articles a JOIN users u ON a.userid = u.userid ORDER BY createdon DESC) 
                                        SELECT row_number() over (order by (select NULL)) as id, itemid, createdon, title, item, userid, author 
                                        INTO feed FROM A`;
                    </sub>
                    </p>
                    <p>
                    So i needed to churn out all that query to build the feed API. It selects from 2 tables, image and article, and whips up a temporary table with new row IDs. 
                    Until my homunculus (little man in my head) pointed out how unnecassarily non performant the query was, i felt all deft for writing such advanced database query. I guess it could 
                    have held if there wasn't an alternative, though it meant going against the project spec, which was exactly what i did(with a reminder to sort it with the team lead, 
                    caveat, i am the team lead ;). It required a relation containing both image and article,
                    which accepts null values. Since both tables had 5 columns (imageId, userId, imageurl, title, createdon) and (articleId, userId, article, title, createdon) respectively, 
                    i only needed a new table with 6 columns (itemId, userid, title, imageurl, article, createdon). So an image post populates every column but article, which gets null, 
                    and vice-versa. With the resultant query shown below, i thought it was neater and more performant at any scale.  
                    </p>
                    <p>
                    <sub>
                        const simpleQuery = `SELECT i.itemid, i.imageurl, i.article, i.title, i.userid, i.createdon, u.firstname,
                                            u.lastname FROM items i JOIN users u ON i.userid = u.userid ORDER BY createdon DESC`;
                    </sub>
                    </p>
                    <p>
                    Except for asthetics and enhancement of showing the user who posted, which isn't in the spec, it doesn't need a JOIN operation whatsoever, it could have been a simple
                    select statement ordering by date, and piam! i'd have my feed :). But in this day and age of social media, what is a post without an author's name? 
                    </p>
                    </li>
                    </ul>

                    <h5>Issues</h5>
                    <p>
                    Since i have been dragging the project spec, i figured i should wash my dirty linen in public as well, before you go find out how inept i have been with some of those endpoints. 
                    Though i have created and consumed all required endpoints, the project is not completely production ready. But after reading @unicodeveloper article titled 
                    "Who is Speaking On Your Behalf? by Prosper Otemuyiwa", i thought it was time to let the world in on my awesome coding prowess:) So whilst you see how i saved the third realm 
                    with code, be forearmed.
                    </p>
                    <ul>
                    <li>
                    Unit Tests. I am yet to cover major test cases for my endpoints in order to return human friendly server responses to the UI, so be forewarned with the "fail to fetch(es)". I hate them too. 
                    This issue led me to realise how tricky server responses are with the MERN stack, i miss my PHP. The perfectionist in me would have waited to get it right first before release,
                    but nope, no longer will i play perfect on first iterations, yes i said that.
                    </li>
                    <li>
                    Travis CI. How many times did i call you. You a *. Now we have that out of the way, getting .travis.yml configurations was such a block, i did find a coder at the meetup who'd held it down already, and made a mental
                    note to have him lead me through once i was ready, but i'd since moved on to other things since it wasn't terribly affecting the project, except for best practice's sake. 
                    </li>
                    <li>
                    Validations and Alerts. Javascript Fetch API lets you return custom error messages, but has no seamless way of getting server error responses i stand to be corrected on this assertion though. So until i find my way, 
                    you may not find a whole lot of validation and alert messages, but i gurantee you won't be posting empty forms neither. 
                    </li>
                    </ul>

                    <h5>Enhancements</h5>
                    <ul>
                    <li>
                    My major enhancement would be form state persistence with react-redux-form. When i first experienced it with the Facebook app long before i wrote my first code, i felt it was magical as it allowed me navigate the app
                    and not worry about losing unfinished posts. On becoming a develper, i was and stil am, unrepentant about building great UX. Only the create-user route has that implementation for now. You may experiment with it,
                    as you will see, the submit button is disabled as only "isadmin = true" has the right to create a new user.
                    </li>
                    <li>
                    For the "update and delete" endpoints, setting up the menu options with Material UI components was a first for me, and memorable because it led to finally learning react hooks, making functional components the more useful.
                    Its minimalist aesthetic does enhance the UI in ways i am proud of.
                    </li>
                    </ul>

                    <p>
                    In all, this project represented the high point of my developer journey in 2019, and is still setting the pace in 2020, as i have addons like PWA standards, infinite scroll, etc, to implement. I am grateful to Andela
                    and Facebook for the learning opportunity. The Andela team who made it happen were awesome, and by submitting this project, i hope i get to meet them again. Check out login details, and links to project repo below. 
                    If you made it this far in this age of short attention spans, Thanks for staying with me.
                    </p>

                    <ul>
                    <li><em>Frontend repo</em>: <a href="https://github.com/stteem/teamwork">https://github.com/stteem/teamwork</a></li>
                    <li><em>Backend repo</em>: <a href="https://github.com/stteem/teamwork-server">https://github.com/stteem/teamwork-server</a></li>
                    </ul>

                    <h5>Login Detail 1</h5>
                    <ul>
                    <li>Email: guest@gmail.com</li>
                    <li>Password: password</li>
                    </ul>
                    <h5>Login Detail 2</h5>
                    <ul>
                    <li>Email: ekn@gmail.com</li>
                    <li>Password: password</li>
                    </ul>
                    
                </div>
                
                <div className="col-12">
                    <Card>
                        <CardBody className="bg-faded">
                            <div className="row row-content">
                                <div className="col-12">
                                <h3>Contact Information</h3>
                                </div>
                                <div className="col-12 col-sm-4 offset-sm-1">
                                        <h5>Address</h5>
                                        <address>
                                        Uyo, Akwa Ibom State<br />
                                        Nigeria<br />
                                        <i className="fa fa-phone"></i>: +234 907 106 4360<br />
                                        <i className="fa fa-envelope"></i>: <a href="mailto:uwemeffionguke@gmail.com">uwemeffionguke@gmail.com</a>
                                        </address>
                                </div>
                                
                                <div className="col-12 col-sm-11 offset-sm-1">
                                    <div className="btn-group" role="group">
                                        <a role="button" className="btn btn-primary" href="tel:+2349071064360"><i className="fa fa-phone"></i> Call</a>
                                        <a role="button" className="btn btn-success" href="mailto:uwemeffionguke@gmail.com"><i className="fa fa-envelope-o"></i> Email</a>
                                    </div>
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                </div>
            </div>
            
        </div>
    );
}

export default About;    
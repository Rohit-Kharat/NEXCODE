import React from 'react';
import './card.css';

const CardComponent = () => {
    return (
        <div>
            <div className="maincard">
                <div className="card">
                    <div className="cardinfo">
                        <img className="imageoflanguage" width="50px" height="50px" src="Images\icon.png" alt="" />
                        <h4 className="head1">AI Code Completion</h4>
                        <p className="para">Write code faster using our built-in code completion, powered by Codeium.</p>
                    </div>
                    <div className="Numberofsharing">
                        <img className="sharing" width="30px" height="30px" src="Images\business-people.png" alt="" />
                        <div className="sharingnumber">216.2k</div>
                    </div>
                </div>
                <div className="card">
                    <div className="cardinfo">
                        <img className="imageoflanguage" width="50px" height="50px" src="public\Images\docker.png" alt="" />
                        <h4 className="head1">Docker</h4>
                        <p className="para">The easiest way to get started from Docker in CodeSandbox</p>
                    </div>
                    <div className="Numberofsharing">
                        <img className="sharing" width="30px" height="30px" src="public\Images\business-people.png" alt="" />
                        <div className="sharingnumber">6.4k</div>
                    </div>
                </div>
                <div className="card">
                    <div className="cardinfo">
                        <img className="imageoflanguage" width="50px" height="50px" src="public\Images\angular.png" alt="" />
                        <h4 className="head1">Angular</h4>
                        <p className="para">The quickest way to get started with Angular!</p>
                    </div>
                    <div className="Numberofsharing">
                        <img className="sharing" width="30px" height="30px" src="public\Images\business-people.png" alt="" />
                        <div className="sharingnumber">1.9k</div>
                    </div>
                </div>
            </div>
            <div className="maincard">
                <div className="card">
                    <div className="cardinfo">
                        <img className="imageoflanguage" width="50px" height="50px" src="public\Images\html.png" alt="" />
                        <h4 className="head1">Html + CSS</h4>
                        <p className="para">A template for HTML and CSS</p>
                    </div>
                    <div className="Numberofsharing">
                        <img className="sharing" width="30px" height="30px" src="public\Images\business-people.png" alt="" />
                        <div className="sharingnumber">88.6k</div>
                    </div>
                </div>
                <div className="card">
                    <div className="cardinfo">
                        <img className="imageoflanguage" width="50px" height="50px" src="public\Images\javascript.png" alt="" />
                        <h4 className="head1">Javascript</h4>
                        <p className="para">The JavaScript template</p>
                    </div>
                    <div className="Numberofsharing">
                        <img className="sharing" width="30px" height="30px" src="public\Images\business-people.png" alt="" />
                        <div className="sharingnumber">65.1k</div>
                    </div>
                </div>
                <div className="card">
                    <div className="cardinfo">
                        <img className="imageoflanguage" width="50px" height="50px" src="public\Images\nextjs.png" alt="" />
                        <h4 className="head1">Next.js</h4>
                        <p className="para">The official Next.js template by the CodeSandbox team</p>
                    </div>
                    <div className="Numberofsharing">
                        <img className="sharing" width="30px" height="30px" src="public\Images\business-people.png" alt="" />
                        <div className="sharingnumber">33.9k</div>
                    </div>
                </div>
            </div>
            <div className="maincard">
                <div className="card">
                    <div className="cardinfo">
                        <img className="imageoflanguage" width="50px" height="50px" src="public\Images\python.png" alt="" />
                        <h4 className="head1">Python</h4>
                        <p className="para">The starter template of Python for CodeSandbox</p>
                    </div>
                    <div className="Numberofsharing">
                        <img className="sharing" width="30px" height="30px" src="public\Images\business-people.png" alt="" />
                        <div className="sharingnumber">88.6k</div>
                    </div>
                </div>
                <div className="card">
                    <div className="cardinfo">
                        <img className="imageoflanguage" width="50px" height="50px" src="public\Images\nextjs.png" alt="" />
                        <h4 className="head1">Next.js + Postgres</h4>
                        <p className="para">The perfect starter for a full-stack application.</p>
                    </div>
                    <div className="Numberofsharing">
                        <img className="sharing" width="30px" height="30px" src="public\Images\business-people.png" alt="" />
                        <div className="sharingnumber">65.1k</div>
                    </div>
                </div>
                <div className="card">
                    <div className="cardinfo">
                        <img className="imageoflanguage" width="50px" height="50px" src="public\Images\react.png" alt="" />
                        <h4 className="head1">React</h4>
                        <p className="para">Quickest way to get started with a React application! Uses Vite on the server.</p>
                    </div>
                    <div className="Numberofsharing">
                        <img className="sharing" width="30px" height="30px" src="public\Images\business-people.png" alt="" />
                        <div className="sharingnumber">33.9k</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CardComponent;

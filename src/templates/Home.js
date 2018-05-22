import React from 'react';

export const Home = () => (

<div>

          <section id="sidebar">


              <section id="intro">
                <a className="logo"><img src="images/money.png" alt="" /></a>
                <header>
                  <h2>Lending Decentralised</h2>
                  <p> Ethereum based lending application </p>
                </header>
              </section>


              <section>
                <div className="mini-posts">

                    <article className="mini-post">
                      <header>
                        <h3><a href="/create_loans"> Create a loans request </a></h3>
                        <time className="published"> and wait for someone to accept it </time>
                      </header>
                      <a href="/create_loans" className="image"><img src="images/lending.jpg" alt="" /></a>
                    </article>


                    <article className="mini-post">
                      <header>
                        <h3><a href="/proposed"> Accept an existing loan request</a></h3>
                        <p>TLS-N protocol verifies the interest rates you receive</p>
                      </header>
                      <a href="/proposed" className="image"><img src="images/keyboard.jpg" alt="" /></a>
                    </article>


                </div>
              </section>

              <section className="blurb">
                <h2>About</h2>
                	 <p>We have created a decentralised application on the Ethereum test network (Rinkeby) that allows users to borrow funds against assets they hold. Our smart contract holds records asset ownership, as well as any loans against these assets.
				     We use the TLS-N protocol to verify the interest rates that users should be paying on their loans.
				    </p>
				    <p>Smart contracts written on the blockchain cannot fetch real world data and must rely on trusted, third-party oracles to request it from the desired source. Currently, these oracles must be trusted to feed the data unedited to the blockchain for use by the requesting contract.</p>
				    <p>Having the ability to independently verify information would remove the need for trust in third parties while guaranteeing the validity of the data received over the internet. As a result, it would be possible to automatically feed this information into the blockchain ecosystem and execute contracts on the basis of it. TLS-N, an extension to the existing secure web protocol TLS, achieves this goal.</p>
					<p>It provides a secure, non-repudiable and trivially verifiable proof about the contents (message, time-stamped) of a TLS session, and that the contents have not been tampered with. As a result, users no longer need to trust that oracles or intermediaries have not tampered with data, and can automate the execution of their contracts based on the TLS-N verification.</p>
              </section>


              <section className = "container">
              	
                <h2 className="major">The Team</h2>
                 <p>This test product has been developed by a team of students at Imperial College London in order to demonstrate a real-world application of the TLS-N protocol.</p>
                 
                 <div className = "row">
                  <div className="6u 12u(mobile)">
		                  <section>
		                  	<h3>  Matthew Morrison </h3>                         
		                  	<p >Responsible for smart contract and front-end development. 
		                     <a href="https://github.com/matthewsmorrison" target="_blank"> GitHub </a>
		                     </p>
		                  </section>
		                 
		                  <section>
		                  	<h3 className="major"> Bastien Moyroud </h3>
		                    <p>Responsible for front-end and server-side development.
		                    <a href="https://github.com/bmoyroud" target="_blank"> GitHub</a>
		                    </p>
		                  </section>

		                  <section> 
		                  	 <h3 className="major"> Mohammed Hussan </h3>
		                     <p>Responsible for smart contract and front-end development.
		                        <a href="https://github.com/Mo-Hussain" target="_blank"> GitHub</a>
		                     </p>
		                  </section>
		            </div>
		            <div className="6u 12u(mobile)">
		                  <section> 
		                     <h3 className="major"> Vincent Groff </h3>
		                     <p>Responsible for smart contract and front-end development.
		                        <a href="https://github.com/vgroff" target="_blank"> GitHub</a>
		                     </p>
		                  </section>

		                  <section> 
		                      <h3 className="major"> Mike Scott</h3>
		                      <p>Responsible for server-side development.
		                         <a href="https://github.com/bmwwilliams1" target="_blank"> GitHub</a>
		                      </p>
		                  </section>

		                  <section> 
		                        <h3 className="major"> Nijat Bakhshaliyev </h3>
		                        <p>Responsible for front-end development.
		                          <a href="https://github.com/nijatb" target="_blank"> GitHub</a>
		                        </p>
		                  </section>
                 	</div>
                  </div>
              </section>
             

              <section id="footer">
                <p className="copyright">&copy; Lending DApp. Design: <a href="http://html5up.net">HTML5 UP</a>. Images: <a href="http://unsplash.com">Unsplash</a>.</p>
              </section>

           </section>


	</div>
);



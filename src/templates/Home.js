import React from 'react';

export const Home = () => (

<div>

          <section id="sidebar">


              <section id="intro">
                <a href="#" className="logo"><img src="images/logo.jpg" alt="" /></a>
                <header>
                  <h2>Lending Distributed</h2>
                  <p> Ethereum based lending application </p>
                </header>
              </section>

              {/*
              <section>
                <div className="mini-posts">


                    <article className="mini-post">
                      <header>
                        <h3><a href="#">Vitae sed condimentum</a></h3>
                        <time className="published" datetime="2015-10-20">October 20, 2015</time>
                        <a href="#" className="author"><img src="images/avatar.jpg" alt="" /></a>
                      </header>
                      <a href="#" className="image"><img src="images/pic04.jpg" alt="" /></a>
                    </article>


                    <article className="mini-post">
                      <header>
                        <h3><a href="#">Rutrum neque accumsan</a></h3>
                        <time className="published" datetime="2015-10-19">October 19, 2015</time>
                        <a href="#" className="author"><img src="images/avatar.jpg" alt="" /></a>
                      </header>
                      <a href="#" className="image"><img src="images/pic05.jpg" alt="" /></a>
                    </article>


                    <article className="mini-post">
                      <header>
                        <h3><a href="#">Odio congue mattis</a></h3>
                        <time className="published" datetime="2015-10-18">October 18, 2015</time>
                        <a href="#" className="author"><img src="images/avatar.jpg" alt="" /></a>
                      </header>
                      <a href="#" className="image"><img src="images/pic06.jpg" alt="" /></a>
                    </article>


                    <article className="mini-post">
                      <header>
                        <h3><a href="#">Enim nisl veroeros</a></h3>
                        <time className="published" datetime="2015-10-17">October 17, 2015</time>
                        <a href="#" className="author"><img src="images/avatar.jpg" alt="" /></a>
                      </header>
                      <a href="#" className="image"><img src="images/pic07.jpg" alt="" /></a>
                    </article>

                </div>
              </section>


              <section>
                <ul className="posts">
                  <li>
                    <article>
                      <header>
                        <h3><a href="#">Lorem ipsum fermentum ut nisl vitae</a></h3>
                        <time className="published" datetime="2015-10-20">October 20, 2015</time>
                      </header>
                      <a href="#" className="image"><img src="images/pic08.jpg" alt="" /></a>
                    </article>
                  </li>
                  <li>
                    <article>
                      <header>
                        <h3><a href="#">Convallis maximus nisl mattis nunc id lorem</a></h3>
                        <time className="published" datetime="2015-10-15">October 15, 2015</time>
                      </header>
                      <a href="#" className="image"><img src="images/pic09.jpg" alt="" /></a>
                    </article>
                  </li>
                  <li>
                    <article>
                      <header>
                        <h3><a href="#">Euismod amet placerat vivamus porttitor</a></h3>
                        <time className="published" datetime="2015-10-10">October 10, 2015</time>
                      </header>
                      <a href="#" className="image"><img src="images/pic10.jpg" alt="" /></a>
                    </article>
                  </li>
                  <li>
                    <article>
                      <header>
                        <h3><a href="#">Magna enim accumsan tortor cursus ultricies</a></h3>
                        <time className="published" datetime="2015-10-08">October 8, 2015</time>
                      </header>
                      <a href="#" className="image"><img src="images/pic11.jpg" alt="" /></a>
                    </article>
                  </li>
                  <li>
                    <article>
                      <header>
                        <h3><a href="#">Congue ullam corper lorem ipsum dolor</a></h3>
                        <time className="published" datetime="2015-10-06">October 7, 2015</time>
                      </header>
                      <a href="#" className="image"><img src="images/pic12.jpg" alt="" /></a>
                    </article>
                  </li>
                </ul>
              </section>
 */}
              <section className="blurb">
                <h2>About</h2>
                	 <p>We have created a decentralised application on the Ethereum test network (Rinkeby) that allows users to borrow funds against assets they hold. Our smart contract holds records asset ownership, as well as any loans against these assets.
				     We use the TLS-N protocol to verify the interest rates that users should be paying on their loans.
				    </p>
				    <p>Smart contracts written on the blockchain cannot fetch real world data and must rely on trusted, third-party oracles to request it from the desired source. Currently, these oracles must be trusted to feed the data unedited to the blockchain for use by the requesting contract.</p>
				    <p>Having the ability to independently verify information would remove the need for trust in third parties while guaranteeing the validity of the data received over the internet. As a result, it would be possible to automatically feed this information into the blockchain ecosystem and execute contracts on the basis of it. TLS-N, an extension to the existing secure web protocol TLS, achieves this goal.</p>
					<p>It provides a secure, non-repudiable and trivially verifiable proof about the contents (message, time-stamped) of a TLS session, and that the contents have not been tampered with. As a result, users no longer need to trust that oracles or intermediaries have not tampered with data, and can automate the execution of their contracts based on the TLS-N verification.</p>
              </section>


              <section id="footer">
                <ul class="icons">
                  <li><a href="#" class="fa-twitter"><span class="label">Twitter</span></a></li>
                  <li><a href="#" class="fa-facebook"><span class="label">Facebook</span></a></li>
                  <li><a href="#" class="fa-instagram"><span class="label">Instagram</span></a></li>
                  <li><a href="#" class="fa-rss"><span class="label">RSS</span></a></li>
                  <li><a href="#" class="fa-envelope"><span class="label">Email</span></a></li>
                </ul>
                <p class="copyright">&copy; Untitled. Design: <a href="http://html5up.net">HTML5 UP</a>. Images: <a href="http://unsplash.com">Unsplash</a>.</p>
              </section>
             
          </section>



	</div>
);



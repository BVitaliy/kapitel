<!DOCTYPE html>
<html lang="en">

<head>
    <?php include 'inc/global/_top.php';?>
    <title>Template :: Elements</title>
</head>

<body>
    <div id="content-block">
        <?php include 'inc/global/_header.php';?>

        <main>
            <!-- popup -->
            <div class="section">
                <div class="container">
                    <div class="h1 title mb-md text-center">Popups</div>

                    <div class="row justify-content-center">
                        <div class="col-xl-8 col-lg-10 text-center"
                            style="font-size:0;display:flex;flex-wrap:wrap;gap:0.625rem;">
                            <div class="btn open-popup" data-rel="1">
                                <b>Thanks</b>
                            </div>
                            <div class="btn open-popup" data-rel="2">
                                <b>Text popup</b>
                            </div>
                            <div class="btn open-popup" data-rel="3">
                                <b>Form popup</b>
                            </div>
                            <div class="btn open-popup" data-rel="4">
                                <b>Register</b>
                            </div>
                            <div class="btn open-popup" data-rel="5">
                                <b>Sign In</b>
                            </div>
                            <div class="btn open-popup" data-rel="6">
                                <b>Welcome</b>
                            </div>
                            <div class="btn open-popup" data-rel="7">
                                <b>Forgot password</b>
                            </div>
                            <div class="btn open-popup" data-rel="8">
                                <b>New password</b>
                            </div>
                            <div class="btn open-popup" data-rel="9">
                                <b>Notify when availability</b>
                            </div>
                            <div class="btn open-popup" data-rel="10">
                                <b>Buy in one click</b>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- inputs -->
            <div class="section">
                <div class="container">
                    <div class="h1 title mb-md text-center">Form inputs</div>
                    <div class="row justify-content-center">
                        <div class="col-lg-8 col-xl-6">
                            <form class="form-block">
                                <div class="row">
                                    <div class="col-sm-6">
                                        <div class="input-field">
                                            <div class="input-placeholder">Name*</div>
                                            <input class="input" type="text" aria-label="Name" required>
                                            <div class="input-error">Please fill in this field</div>
                                        </div>
                                    </div>
                                    <div class="col-sm-6">
                                        <div class="input-field">
                                            <div class="input-placeholder">Phone Number*</div>
                                            <input class="input" type="tel" aria-label="Phone" required>
                                            <div class="input-error">Please fill in this field</div>
                                        </div>
                                    </div>
                                    <div class="col-sm-6">
                                        <div class="input-field">
                                            <div class="input-placeholder">Email*</div>
                                            <input class="input" type="email" aria-label="Email" required>
                                            <div class="input-error">Please fill in this field</div>
                                        </div>
                                    </div>
                                    <div class="col-sm-6">
                                        <div class="input-field">
                                            <select class="SelectBox" aria-label="Select">
                                                <option>Option 1</option>
                                                <option>Option 2</option>
                                                <option>Option 3</option>
                                                <option>Option 4</option>
                                                <option>Option 5</option>
                                                <option>Option 6</option>
                                                <option>Option 7</option>
                                                <option>Option 8</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="col-sm-6">
                                        <div class="input-field">
                                            <div class="input-placeholder">Range Calendar</div>
                                            <input class="input calendar" type="text" required>
                                            <div class="input-error">Please fill in this field</div>
                                        </div>
                                    </div>
                                    <div class="col-sm-6">
                                        <div class="input-field">
                                            <div class="input-placeholder">Birthday Calendar</div>
                                            <input class="input calendar birthday" type="text" required>
                                            <div class="input-error">Please fill in this field</div>
                                        </div>
                                    </div>
                                    <div class="col-sm-6">
                                        <div class="input-field">
                                            <div class="phone-input">
                                                <select class="SelectBox" aria-label="Phone Select">
                                                    <option value="+93">+93</option>
                                                    <option value="+355">+355</option>
                                                    <option value="+213">+213</option>
                                                    <option value="+1684">+1684</option>
                                                </select>
                                                <input class="input select-tel" type="tel" required
                                                    placeholder="Phone Number*">
                                            </div>
                                            <div class="input-error">Please fill in this field</div>
                                        </div>
                                    </div>
                                    <div class="col-sm-6">
                                        <div class="date-separate-input">
                                            <div class="input-field">
                                                <div class="input-placeholder">Day</div>
                                                <select class="SelectBox" aria-label="Day Select">
                                                    <option value="1">1</option>
                                                    <option value="2">2</option>
                                                    <option value="3">3</option>
                                                    <option value="4">4</option>
                                                    <option value="5">5</option>
                                                    <option value="6">6</option>
                                                    <option value="7">7</option>
                                                    <option value="8">8</option>
                                                    <option value="9">9</option>
                                                    <option value="10">10</option>
                                                    <option value="11">11</option>
                                                    <option value="12">12</option>
                                                    <option value="13">13</option>
                                                    <option value="14">14</option>
                                                    <option value="15">15</option>
                                                    <option value="16">16</option>
                                                    <option value="17">17</option>
                                                    <option value="18">18</option>
                                                    <option value="19">19</option>
                                                    <option value="20">20</option>
                                                    <option value="21">21</option>
                                                    <option value="22">22</option>
                                                    <option value="23">23</option>
                                                    <option value="24">24</option>
                                                    <option value="25">25</option>
                                                    <option value="26">26</option>
                                                    <option value="27">27</option>
                                                    <option value="28">28</option>
                                                    <option value="29">29</option>
                                                    <option value="30">30</option>
                                                    <option value="31">31</option>
                                                </select>
                                            </div>
                                            <div class="input-field">
                                                <div class="input-placeholder">Month</div>
                                                <select class="SelectBox" aria-label="Month Select">
                                                    <option value="1">Jan</option>
                                                    <option value="2">Feb</option>
                                                    <option value="3">Mar</option>
                                                    <option value="4">Apr</option>
                                                    <option value="5">May</option>
                                                    <option value="6">Jun</option>
                                                    <option value="7">Jul</option>
                                                    <option value="8">Aug</option>
                                                    <option value="9">Sep</option>
                                                    <option value="10">Oct</option>
                                                    <option value="11">Nov</option>
                                                    <option value="12">Dec</option>
                                                </select>
                                            </div>
                                            <div class="input-field">
                                                <div class="input-placeholder">Year</div>
                                                <select class="SelectBox" aria-label="Year Select">
                                                    <option value="2011">2011</option>
                                                    <option value="2010">2010</option>
                                                    <option value="2009">2009</option>
                                                    <option value="2008">2008</option>
                                                    <option value="2007">2007</option>
                                                    <option value="2006">2006</option>
                                                    <option value="2005">2005</option>
                                                    <option value="2004">2004</option>
                                                    <option value="2003">2003</option>
                                                    <option value="2002">2002</option>
                                                    <option value="2001">2001</option>
                                                    <option value="2000">2000</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="input-error">Invalid date</div>
                                    </div>
                                    <div class="col-12">
                                        <div class="input-field">
                                            <div class="input-placeholder">Message*</div>
                                            <textarea class="input" aria-label="Message" required></textarea>
                                            <div class="input-error">Please fill in this field</div>
                                        </div>
                                    </div>
                                </div>

                                <div class="ch-box-wrap">
                                    <label class="ch-box">
                                        <input type="checkbox">
                                        <span>
                                            I have read and agree to <a href="privacy.php">Privacy Policy</a>
                                        </span>
                                    </label>
                                </div>

                                <div class="ch-box-wrap">
                                    <label class="ch-box">
                                        <input type="radio" name="name">
                                        <span>Name 1</span>
                                    </label>
                                    <label class="ch-box">
                                        <input type="radio" name="name">
                                        <span>Name 2</span>
                                    </label>
                                    <label class="ch-box">
                                        <input type="radio" name="name">
                                        <span>Name 3</span>
                                    </label>
                                </div>

                                <!-- change on program to button tag and add type="submit" -->
                                <div class="btn btn-primary open-popup" data-rel="1">
                                    <b>Submit form</b>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </div>

            <!-- btn -->
            <div class="section">
                <div class="container">
                    <div class="h1 title mb-md text-center">Buttons</div>
                    <div class="row justify-content-center">
                        <div class="col-xl-8 col-lg-10">
                            <div class="btn">
                                <b>Button</b>
                            </div>
                            <div class="btn btn-primary">
                                <b>Button primary</b>
                            </div>
                            <div class="btn btn-primary disabled">
                                <b>Button primary</b>
                            </div>
                            <div class="btn btn-primary">
                                <b>Button icon</b>
                                <svg width="15" height="11" viewBox="0 0 15 11" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M1.1665 5.53325L13.7665 5.53325M13.7665 5.53325L9.2665 1.33325M13.7665 5.53325L9.26651 9.73325"
                                        stroke='white' stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                            </div>
                            <div class="btn-link">Read more</div>
                            <div class="btn-close"></div>
                        </div>
                        <div class="col-xl-8 col-lg-10 " style="background: var(--clr-black)">
                            <div class="btn btn-secondary">
                                <b>Button secondary</b>
                            </div>
                            <div class="btn btn-secondary btn-svg">
                                <b>Button icon</b>
                                <svg width="15" height="11" viewBox="0 0 15 11" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M1.1665 5.53325L13.7665 5.53325M13.7665 5.53325L9.2665 1.33325M13.7665 5.53325L9.26651 9.73325"
                                        stroke='white' stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="btn btn-primary btn-block">
                                <b>Button full width</b>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Colors  -->
            <div class="section">
                <div class="container">
                    <div class="h2 title mb-md text-center">Colors</div>

                    <div class="row justify-content-center">
                        <div class="col-xl-8 col-lg-10">
                            <div class="row">
                                <div class="col-lg-2 col-md-3 col-sm-4 col-6 text-center">
                                    <span
                                        style="display: inline-block; width: 100px;height: 100px;border: 2px dashed #000; background: var(--clr-title)">
                                    </span>
                                    <br>
                                    <b>--clr-title: #131E29</b>
                                </div>
                                <div class="col-lg-2 col-md-3 col-sm-4 col-6 text-center">
                                    <span
                                        style="display: inline-block; width: 100px;height: 100px;border: 2px dashed #000; background: var(--clr-text)">
                                    </span>
                                    <br>
                                    <b>--clr-text: #4A5055</b>
                                </div>
                                <div class="col-lg-2 col-md-3 col-sm-4 col-6 text-center">
                                    <span
                                        style="display: inline-block; width: 100px;height: 100px;border: 2px dashed #000; background: var(--clr-plc)">
                                    </span>
                                    <br>
                                    <b>--clr-plc: #4A5055</b>
                                </div>
                                <div class="col-lg-2 col-md-3 col-sm-4 col-6 text-center">
                                    <span
                                        style="display: inline-block; width: 100px;height: 100px;border: 2px dashed #000; background: var(--clr-input)">
                                    </span>
                                    <br>
                                    <b>--clr-input: #D3D3D3</b>
                                </div>
                                <div class="col-lg-2 col-md-3 col-sm-4 col-6 text-center">
                                    <span
                                        style="display: inline-block; width: 100px;height: 100px;border: 2px dashed #000; background: var(--clr-black)">
                                    </span>
                                    <br>
                                    <b>--clr-black: #131E29</b>
                                </div>
                                <div class="col-lg-2 col-md-3 col-sm-4 col-6 text-center">
                                    <span
                                        style="display: inline-block; width: 100px;height: 100px;border: 2px dashed #000; background: var(--clr-white)">
                                    </span>
                                    <br>
                                    <b>--clr-white: #ffffff</b>
                                </div>
                                <div class="col-lg-2 col-md-3 col-sm-4 col-6 text-center">
                                    <span
                                        style="display: inline-block; width: 100px;height: 100px;border: 2px dashed #000; background: var(--clr-red)">
                                    </span>
                                    <br>
                                    <b>--clr-red: #e70000</b>
                                </div>
                                <div class="col-lg-2 col-md-3 col-sm-4 col-6 text-center">
                                    <span
                                        style="display: inline-block; width: 100px;height: 100px;border: 2px dashed #000; background: var(--clr-grey)">
                                    </span>
                                    <br>
                                    <b>--clr-grey: #D3D3D3</b>
                                </div>
                                <div class="col-lg-2 col-md-3 col-sm-4 col-6 text-center">
                                    <span
                                        style="display: inline-block; width: 100px;height: 100px;border: 2px dashed #000; background: var(--clr-grey-2)">
                                    </span>
                                    <br>
                                    <b>--clr-grey-2: #E6E6E6</b>
                                </div>
                                <div class="col-lg-2 col-md-3 col-sm-4 col-6 text-center">
                                    <span
                                        style="display: inline-block; width: 100px;height: 100px;border: 2px dashed #000; background: var(--clr-org)">
                                    </span>
                                    <br>
                                    <b>--clr-org: #FF6A39</b>
                                </div>
                                <div class="col-lg-2 col-md-3 col-sm-4 col-6 text-center">
                                    <span
                                        style="display: inline-block; width: 100px;height: 100px;border: 2px dashed #000; background: var(--clr-green)">
                                    </span>
                                    <br>
                                    <b>--clr-green: #009F4D</b>
                                </div>
                                <div class="col-lg-2 col-md-3 col-sm-4 col-6 text-center">
                                    <span
                                        style="display: inline-block; width: 100px;height: 100px;border: 2px dashed #000; background: var(--clr-prl)">
                                    </span>
                                    <br>
                                    <b>--clr-prl: #A05EB5</b>
                                </div>
                                <div class="col-lg-2 col-md-3 col-sm-4 col-6 text-center">
                                    <span
                                        style="display: inline-block; width: 100px;height: 100px;border: 2px dashed #000; background: var(--bg-1)">
                                    </span>
                                    <br>
                                    <b>--clr-bg-1: #F9F9F9</b>
                                </div>
                                <div class="col-lg-2 col-md-3 col-sm-4 col-6 text-center">
                                    <span
                                        style="display: inline-block; width: 100px;height: 100px;border: 2px dashed #000; background: var(--bg-2)">
                                    </span>
                                    <br>
                                    <b>--clr-bg-2: #1A2530</b>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Editor text -->
            <div class="section">
                <div class="container">
                    <div class="h1 title mb-md text-center">Editor text</div>
                    <div class="row justify-content-center">
                        <div class="col-xl-8 col-lg-10 ">
                            <h1>H1 - Lorem ipsum dolor</h1>
                            <h2>H2 - Lorem ipsum dolor</h2>
                            <h3>H3 - Lorem ipsum dolor</h3>
                            <h4>H4 - Lorem ipsum dolor</h4>
                            <h5>H5 - Lorem ipsum dolor</h5>
                            <h6>H6 - Lorem ipsum dolor</h6>
                        </div>

                        <?php include 'template-parts/_simple-text.php';?>
                    </div>
                </div>
            </div>
        </main>

        <?php include 'inc/global/_footer.php';?>
    </div>

    <!-- Popups -->
    <div class="popup-wrapper" id="popups"></div>
    <?php include 'inc/global/_bottom.php';?>
    <?php include 'inc/global/_swiper.php';?>
    <?php include 'inc/global/_cookies.php';?>
    <?php include 'inc/global/_form.php';?>
</body>

</html>
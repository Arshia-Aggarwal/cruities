async function registerowner() {
  let name = document.getElementById("name").value;
  let password = document.getElementById("password").value;
  let email = document.getElementById("email").value;
  let pincode = document.getElementById("pincode").value;
  let contact = document.getElementById("phonenumber").value;
  console.log(contact);
  let address = document.getElementById("Address").value;
  let obj = {
    name: name,
    password: password,
    email: email,
    pinCode: pincode,
    contact: contact,
    address: address,
  };
  console.log(obj);
  await axios
    .post("https://cruities.herokuapp.com/api/user/register", obj)
    .then((res) => {
      console.log(res.data);
      alert("Registered Successfully");
      window.location.href = "./index.html";
    })
    .catch(function (error) {
      console.log(error);
      alert("Verify details. Old users proceed to login");
    });
  // fetch("https://cruities.herokuapp.com/api/user/register", {
  //   method: "POST",
  //   body: JSON.stringify(obj),
  //   headers: {
  //     "content-type": "application/json",

  //     authorization: window.localStorage.getItem("token"),
  //   },
  // })
  //   .then(function (response) {
  //     // The API call was successful!
  //     return response.json();
  //   })
  //   .then(function (data) {
  //     // This is the JSON from our response
  //     console.log(data);
  //   })
  //   .catch(function (err) {
  //     // There was an error
  //     console.warn("Something went wrong.", err);
  //   });

  // fetch("https://cruities.herokuapp.com/api/business/create/coupon", {
  //   method: "POST",
  //   headers: {
  //     "content-type": "application/json",
  //     authorization: window.localStorage.getItem("token"),
  //   },
  //   body: JSON.stringify({
  //     description,
  //     noOfCoupons,
  //     offeringPrice,
  //     discountRate,
  //     validTill,
  //   }),
  // })
  //   .then((response) => response.json())
  //   .then((data) => console.log(data));
}
async function loginowner() {
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  // console.log(email, password);
  let obj = {
    email: email,
    password: password,
  };
  await axios
    .post("https://cruities.herokuapp.com/api/user/login", obj)
    .then((res) => {
      console.log(res.data);
      localStorage.setItem("email", email);
      window.location.href = "./Business.html";
    })
    .catch(function (error) {
      console.log(error);
      alert("Trouble Logging in. Please verify details entered");
    });
}
async function addcoupon() {
  // console.log(valid);
  let v = new Date();
  v = document.getElementById("valid").value;
  let d = document.getElementById("discount").value;
  let op = document.getElementById("op").value;
  let n = document.getElementById("number").value;
  let desc = document.getElementById("description").value;
  let email = localStorage.getItem("email");
  let obj = {
    discountRate: d,
    description: desc,
    validTill: v,
    noOfCoupons: n,
    offeringPrice: op,
    email: email,
  };
  await axios
    .post("https://cruities.herokuapp.com/api/business/create/coupon", obj)
    .then((res) => {
      console.log(res.data);
      alert("The coupon has been added successfully");
      window.location.href = "./Sell.html";
    })
    .catch(function (error) {
      console.log(error);
    });
}

async function addjob() {
  let title = document.getElementById("jobtitle").value;
  let description = document.getElementById("jobdescription").value;
  let duration = document.getElementById("duration").value;
  let payrange = document.getElementById("payrange").value;
  let email = localStorage.getItem("email");
  let obj = {
    title: title,
    description: description,
    duration: duration,
    payRange: payrange,
    email: email,
  };
  console.log(obj);
  await axios
    .post("https://cruities.herokuapp.com/api/business/create/job", obj)
    .then((res) => {
      console.log(res.data);
      alert("The job has been added successfully");
      window.location.href = "./Hire.html";
    })
    .catch(function (error) {
      console.log(error);
      alert("Verify details entered");
    });
}

async function sendmail() {
  // ..................mailer........
  let email = localStorage.getItem("email");
  await axios
    .post("https://cruities.herokuapp.com/api/send", { email: email })
    .then((res) => {
      console.log(res.data);
    })
    .catch(function (error) {
      console.log(error);
    });
}

// .............businessgetcoupon...
async function getcouponbusiness() {
  let email = localStorage.getItem("email");
  await axios
    .post("https://cruities.herokuapp.com/api/business/coupons", {
      email: email,
    })
    .then((res) => {
      console.log(res.data);
      let coupons = res.data.map(function (coupon) {
        return (
          '<div class="col">' +
          '<div class="coupon">' +
          '<div class="container1" style="background-color:white">' +
          "<h3>" +
          "<b>" +
          coupon.discountRate +
          "% OFF YOUR PURCHASE</b>" +
          "</h3>" +
          "<h5>" +
          coupon.companyName +
          "</h5>" +
          "<p>" +
          coupon.description +
          "</p>" +
          "<p>" +
          coupon.offeringPrice +
          "</p>" +
          "</div>" +
          '<div class="container1">' +
          '<p class="expire">' +
          "Expires:" +
          coupon.validTill +
          "</p>" +
          "</div>" +
          "</div>" +
          "</div>"
        );
      });
      document.getElementById("couponscontainer").innerHTML = coupons;
      // localStorage.setItem("token", res.data);
      // window.location.href = "./Business.html";
    })
    .catch(function (error) {
      console.log(error);
    });
}

// .................usergetcoupon.......
async function getcouponuser() {
  // let email = localStorage.getItem("email");
  let pincode = document.getElementById("userpin").value;
  await axios
    .post("https://cruities.herokuapp.com/api/user/coupons", {
      pincode: pincode,
    })
    .then((res) => {
      console.log(res.data);
      let coupons = res.data.map(function (coupon) {
        return (
          '<div class="col">' +
          '<div class="coupon">' +
          '<div class="container1" style="background-color:white">' +
          "<h3>" +
          "<b>" +
          coupon.discountRate +
          "% OFF YOUR PURCHASE</b>" +
          "</h3>" +
          "<h5>" +
          coupon.companyName +
          "</h5>" +
          "<p>" +
          coupon.description +
          "</p>" +
          "<p>" +
          coupon.offeringPrice +
          "</p>" +
          "</div>" +
          '<div class="container1">' +
          '<p class="expire">' +
          "Expires:" +
          coupon.validTill +
          "</p>" +
          "</div>" +
          '<div class="razorpay-embed-btn" data-url="https://pages.razorpay.com/pl_HIasQcLk7r1o4O/view" data-text="BUY" data-color="#33CCC5" data-size="small">' +
          "<script>" +
          (function () {
            var d = document;
            var x = !d.getElementById("razorpay-embed-btn-js");
            if (x) {
              var s = d.createElement("script");
              s.defer = !0;
              s.id = "razorpay-embed-btn-js";
              s.src = "https://cdn.razorpay.com/static/embed_btn/bundle.js";
              d.body.appendChild(s);
            } else {
              var rzp = window["_rzp_"];
              rzp && rzp.init && rzp.init();
            }
          })() +
          "</script>" +
          "</div>" +
          "</div>" +
          "</div>"
        );
      });
      document.getElementById("couponscontainer").innerHTML = coupons;
      // localStorage.setItem("token", res.data);
      // window.location.href = "./Business.html";
      if (res.data.length == 0) {
        alert("Sorry! Currently no coupons available in your locality");
      }
    })
    .catch(function (error) {
      console.log(error);
    });
}

// ...........businessgetjob.......
async function getjobbusiness() {
  let email = localStorage.getItem("email");
  await axios
    .post("https://cruities.herokuapp.com/api/business/jobs", { email: email })
    .then((res) => {
      console.log(res.data);
      let jobs = res.data.map(function (job) {
        return (
          '<div class="card mx-auto">' +
          '<div class="card-title">' +
          '<p class="heading">' +
          job.title +
          "</p>&nbsp;</p>" +
          "</div>" +
          '<p class="text-muted">' +
          job.description +
          "</p>" +
          "<p>" +
          "Duration:" +
          job.duration +
          "</p>" +
          "<p>" +
          job.payRange +
          "</p>" +
          "<p>" +
          "Contact Details:" +
          "<br>" +
          "MobileNo:" +
          job.contactnumber +
          "<br>" +
          "Email:" +
          job.contactid +
          "</p>" +
          "</div>"
        );
      });
      document.getElementById("jobscontainer").innerHTML = jobs;
      // localStorage.setItem("token", res.data);
      // window.location.href = "./Business.html";
    })
    .catch(function (error) {
      console.log(error);
    });
}

// ...........usergetjob.......
async function getjobuser() {
  let pincode = document.getElementById("userpincode").value;
  await axios
    .post("https://cruities.herokuapp.com/api/user/jobs", { pincode: pincode })
    .then((res) => {
      console.log(res.data);
      let jobs = res.data.map(function (job) {
        return (
          '<div class="card mx-auto">' +
          '<div class="card-title">' +
          '<p class="heading">' +
          job.title +
          "</p>&nbsp;</p>" +
          "</div>" +
          '<p class="text-muted">' +
          job.description +
          "</p>" +
          "<p>" +
          "Duration:" +
          job.duration +
          "</p>" +
          "<p>" +
          job.payRange +
          "</p>" +
          "<p>" +
          "Contact Details:" +
          "<br>" +
          "MobileNo:" +
          job.contactnumber +
          "<br>" +
          "Email:" +
          job.contactid +
          "</p>" +
          "</div>"
        );
      });
      document.getElementById("jobsusercontainer").innerHTML = jobs;
      if (res.data.length == 0) {
        alert("Sorry! Currently no jobs available in your locality");
      }
      // localStorage.setItem("token", res.data);
      // window.location.href = "./Business.html";
    })
    .catch(function (error) {
      console.log(error);
    });
}

// .......................useremailsubmission......

async function registeruser() {
  let email = document.getElementById("useremail").value;
  let pincode = document.getElementById("userpincode").value;

  let obj = {
    email: email,
    pincode: pincode,
  };
  console.log(obj);
  await axios
    .post("https://cruities.herokuapp.com/api/user/email", obj)
    .then((res) => {
      console.log(res.data);
      window.location.href = "./JobsUser.html";
    })
    .catch(function (error) {
      console.log(error);
      alert("Incomplete details provided");
    });
}

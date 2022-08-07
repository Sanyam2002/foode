import SweetAlertContext from "./SweetAlertContext";
import React, { useState } from "react";
import Swal from "sweetalert2";
import $ from "jquery";
import AOS from "aos";

function SweetAlertState(props) {
  const successAlert = () => {
    Swal.fire({
      title: "Good job!",
      text: "You clicked the button",
      icon: "success",
    });
  };
  const questionAlert = () => {
    Swal.fire({
      title: "Error",
      text: "Invalid Credentials !! Please Try Again",
      icon: "error",
    });
  };
  const Address = () => {
    Swal.fire({
      title: "Great !",
      text: "Address Saved Successfully",
      icon: "success",
    });
  };
  const update = () => {
    Swal.fire({
      title: "Great !",
      text: "Address Updated Successfully",
      icon: "success",
    });
  };
  const Delete = () => {
    Swal.fire({
      title: "Great !",
      text: "Deleted Successfully",
      icon: "success",
    });
  };
  const Register = () => {
    Swal.fire({
      title: "Great !",
      text: "Registration Successfull",
      icon: "success",
    });
  };
  const upload = () => {
    Swal.fire({
      title: "Great !",
      text: "Product Uploaded Successfully",
      icon: "success",
    });
  };
  const cart = () => {
    Swal.fire({
      title: "Great !",
      text: "Product Added To Cart Successfully",
      icon: "success",
    });
  };
  const payment1 = () => {
    Swal.fire({
      title: "Great !",
      text: "Product Purchased Successfully",
      icon: "success",
    });
  };
  const toggle = () => {
    $(".cat-toggle").on("click", function () {
      $(".category-menu").slideToggle(500);
      return false;
    });
  };
  const aos = () => {
    AOS.init({
      offset: 200,
      duration: 600,
      easing: "ease-in-sine",
      delay: 100,
    });
  };

  const addminus = () => {
    //mobile menu
    if ($(".mobile-menu").length) {
      //Menu Toggle Btn
      $(".mobile-nav-toggler").on("click", function () {
        $("body").addClass("mobile-menu-visible");
      });

      //Menu Toggle Btn
      $(".menu-backdrop, .mobile-menu .close-btn").on("click", function () {
        $("body").removeClass("mobile-menu-visible");
      });
    }

    /*=============================================
        =    		 Scroll Up  	         =
      =============================================*/
    $(window).on("scroll", function () {
      var scroll = $(window).scrollTop();
      if (scroll < 245) {
        $("#sticky-header").removeClass("sticky-menu");
        $(".scroll-to-target").removeClass("open");
      } else {
        $("#sticky-header").addClass("sticky-menu");
        $(".scroll-to-target").addClass("open");
      }
    });

    if ($(".scroll-to-target").length) {
      $(".scroll-to-target").on("click", function () {
        var target = $(this).attr("data-target");
        // animate
        $("html, body").animate(
          {
            scrollTop: $(target).offset().top,
          },
          10
        );
      });
    }

    //quantity plus minus
    $(".cart-plus-minus").append(
      '<div class="dec qtybutton">-</div><div class="inc qtybutton">+</div>'
    );
    $(".qtybutton").on("click", function () {
      var $button = $(this);
      var oldValue = $button.parent().find("input").val();
      if ($button.text() == "+") {
        var newVal = parseFloat(oldValue) + 1;
      } else {
        // Don't allow decrementing below zero
        if (oldValue > 0) {
          var newVal = parseFloat(oldValue) - 1;
        } else {
          newVal = 0;
        }
      }
      $button.parent().find("input").val(newVal);
    });
  };
  const timer = () => {
    //clock
    function getTimeRemaining(endtime) {
      const total = Date.parse(endtime) - Date.parse(new Date());
      const seconds = Math.floor((total / 1000) % 60);
      const minutes = Math.floor((total / 1000 / 60) % 60);
      const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
      const days = Math.floor(total / (1000 * 60 * 60 * 24));

      return {
        total,
        days,
        hours,
        minutes,
        seconds,
      };
    }

    function initializeClock(id, endtime) {
      const clock = document.getElementById(id);
      const daysSpan = clock.querySelector(".days");
      const hoursSpan = clock.querySelector(".hours");
      const minutesSpan = clock.querySelector(".minutes");
      const secondsSpan = clock.querySelector(".seconds");

      function updateClock() {
        const t = getTimeRemaining(endtime);

        daysSpan.innerHTML = t.days;
        hoursSpan.innerHTML = ("0" + t.hours).slice(-2);
        minutesSpan.innerHTML = ("0" + t.minutes).slice(-2);
        secondsSpan.innerHTML = ("0" + t.seconds).slice(-2);

        if (t.total <= 0) {
          clearInterval(timeinterval);
        }
      }

      updateClock();
      const timeinterval = setInterval(updateClock, 1000);
    }

    const deadline = new Date(
      Date.parse(new Date()) + 15 * 24 * 60 * 60 * 1000
    );
    initializeClock("clockdiv", deadline);
  };
  const contactalert = () => {
    Swal.fire({
      title: "",
      text: "Thanks For Your Feedback",
      icon: "success",
    });
  };

  
  return (
    <SweetAlertContext.Provider
      value={{
        successAlert,
        questionAlert,
        Address,
        Delete,
        Register,
        upload,
        cart,
        toggle,
        payment1,
        update,
        addminus,
        timer,
        aos,
        contactalert,
      }}
    >
      {props.children};
    </SweetAlertContext.Provider>
  );
}

export default SweetAlertState;

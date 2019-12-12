function expandSharings() {
    const container = document.getElementsByClassName('sharing-button-container')[0];
    container.classList.toggle('expanded');
}

// Search toggle
$('.navbar-search-toggle').click(() => {
    const search = document.getElementsByClassName('navbar')[0];
    search.classList.toggle('search-expanded');
});
$('.navbar-search').click(() => {
    const search = document.getElementsByClassName('navbar')[0];
    search.classList.toggle('search-expanded');
});
$('.search .fa-times').click(() => {
    const search = document.getElementsByClassName('navbar')[0];
    const input = document.getElementById('search-input');
    input.value = '';
    $('#search-result .search-results-wrapper').empty();
    search.classList.toggle('search-expanded');
});

// Featured posts menu toggle
$('.featured-post.dropdown').click(() => {
  $('.featured-posts').toggleClass('expanded')
});

$('.featured-posts-expander-out').click(() => {
  $('.featured-posts').toggleClass('expanded')
});

//
// Navbar
//

// Nav Toggle

$('.navbar-nav-toggle').click(() => {
  $('.navbar-nav-toggle').toggleClass('is-active')
  $('.navbar-nav').toggleClass('is-active')
})

// Night Mode Toggle

$('.navbar-night-mode-toggle').click(() => {
  if ($('html').hasClass(nightModeName)) {
    $('html').removeClass(nightModeName)
    localStorage.setItem(nightModeName, 'false')
  } else {
    $('html').addClass(nightModeName)
    localStorage.setItem(nightModeName, 'true')
  }
})

// Scroll Back To Top

const scrollBackToTop = () => $('html, body').animate({scrollTop: 0}, 'slow')

$(document).on('touchstart', '.navbar-touch', event => {
  event.preventDefault()
  event.stopPropagation()
  scrollBackToTop()
})

$('.back-to-top').click(() => {
  scrollBackToTop()
})

$(window).scroll(() => {
  const button = $('.back-to-top')
  const scrollPos = $(document).scrollTop()
  const windowWidth = $(window).width()
  if (scrollPos >= 200 && windowWidth >= 1168) {
    button.css({'display': 'flex'})
  } else {
    button.css({'display': 'none'})
  }
})

//
// Last Paragraph
//

$(document).ready(() => {
  const lastButOneParagraph = $('.js-post-body p').last().prev()
  const oldPostsParagraphText = 'Подписывайтесь на «Код Дурова» в Telegram и во «ВКонтакте», чтобы всегда быть в курсе интересных новостей!'
  if (lastButOneParagraph.text() === oldPostsParagraphText) {
    lastButOneParagraph.remove()
  }
})

//
// Share Buttons
//

$(document).ready(() => {
  // const alreadyExists = $('.js-post-body script[src*="addthis"]').length > 0
  // if (alreadyExists) {
  //  return
  // } else {
    const location = window.location;
    const title = document.title;
    const container = document.createElement('div');
    const expandContainer = $('.sharing-button-container .share-container');
    const shareExpandButton = $('.sharing-button-container .sharing-button');
    container.classList.add('sharing');
    //$(shareExpandButton).click();

    const telegram = document.createElement('a');
    const telegramIcon = document.createElement('i');
    telegramIcon.classList.add('fab', 'fa-telegram-plane');
    telegram.setAttribute('href', encodeURI('https://www.addtoany.com/add_to/telegram?linkurl=' + location + '&linkname=' + title));
    telegram.setAttribute('target', '_blank');
    $(telegram).append(telegramIcon);
    $(container).append(telegram);
    $(telegram).clone().appendTo(expandContainer);

    const facebook = document.createElement('a');
    const facebookIcon = document.createElement('i');
    facebookIcon.classList.add('fab', 'fa-facebook-f');
    facebook.setAttribute('href', encodeURI('https://www.addtoany.com/add_to/facebook?linkurl=' + location + '&linkname=' + title));
    facebook.setAttribute('target', '_blank');
    $(facebook).append(facebookIcon);
    $(container).append(facebook);
    $(facebook).clone().appendTo(expandContainer);

    const twitter = document.createElement('a');
    const twitterIcon = document.createElement('i');
    twitterIcon.classList.add('fab', 'fa-twitter');
    twitter.setAttribute('href', encodeURI('https://www.addtoany.com/add_to/twitter?linkurl=' + location + '&linkname=' + title));
    twitter.setAttribute('target', '_blank');
    $(twitter).append(twitterIcon);
    $(container).append(twitter);
    $(twitter).clone().appendTo(expandContainer);

    const vk = document.createElement('a');
    const vkIcon = document.createElement('i');
    vkIcon.classList.add('fab', 'fa-vk');
    vk.setAttribute('href', encodeURI('https://www.addtoany.com/add_to/vk?linkurl=' + location + '&linkname=' + title));
    vk.setAttribute('target', '_blank');
    $(vk).append(vkIcon);
    $(container).append(vk);
    $(vk).clone().appendTo(expandContainer);

    // const html = '<script src="//s7.addthis.com/js/300/addthis_widget.js#pubid=ra-5aa3915aa61f8d53"></script><p class="addthis_inline_share_toolbox"></p>'
    const firstParagraph = $('.js-post-body p').first()
    // $(html).insertAfter(firstParagraph);
    $(container).insertAfter(firstParagraph);
  // }
});

//
// Responsive Frames
//

$('.kg-embed-card > iframe[src*="youtube"]').reframe()
$('.kg-embed-card > .twitter-tweet').noframe()
$('.kg-embed-card > .instagram-media').noframe()

//
// Sticky Sidebar
//

$('.sidebar-list').stick_in_parent({
  bottoming: true,
  inner_scrolling: true,
  // height (navbar) + padding top (header) + padding bottom (header)
  offset_top: 84,
  sticky_class: 'is-stuck'
})

//
// Load More Posts
//

$($ => {
  const loadMoreBtn = $('.js-load-posts')
  const result = $('.js-feed')
  var currentPage = 1
  var pathname = window.location.pathname
  var isLoading = false

  // remove hash params from pathname
  pathname = pathname.replace(/#(.*)$/g, '').replace('/\//g', '/')

  function loadMorePosts() {
    if (isLoading)
      return

    if (currentPage === maxPages) {
      $(loadMoreBtn).fadeOut(250)
      return
    }

    isLoading = true
    currentPage++
    let nextPage = `${pathname}page/${currentPage}/`

    $.get(nextPage, content => {
        scrollPosition = $(window).scrollTop()
        result.append($(content).find('.js-post').hide().fadeIn(250))
        $(window).scrollTop(scrollPosition)
      })
      .fail(xhr => {
        if (xhr.status === 404) {
          window.removeEventListener('scroll', onScroll, {passive: true})
          window.removeEventListener('resize', onResize)
        }
      })
      .always(() => {
        isLoading = false
      })
  }

  loadMoreBtn.click(loadMorePosts)
})

//
// Snowfall Toggle
//

const snowfallName = 'snowfall';
const snowfall = document.getElementById(snowfallName)
const turnOnSnowfall = () => snowfall.style.display = 'block'
const turnOffSnowfall = () => snowfall.style.display = 'none'

$('.navbar-snowfall-toggle').click(() => {
  if (snowfall.style.display == 'block') {
    turnOffSnowfall()
  } else {
    turnOnSnowfall()
  }
})

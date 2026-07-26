document.querySelectorAll('.opener').forEach(opener => {
    opener.addEventListener('click', function () {
      const question = this.parentElement;
      const answer = question.querySelector('.answer-text');
      const plusIcon = this.querySelector('.plus');
      const minusIcon = this.querySelector('.minus');
  
      // Toggle active class
      question.classList.toggle('active');
  
      // Show or hide answer
      if (question.classList.contains('active')) {
        answer.style.display = 'block';
        plusIcon.style.display = 'none';
        minusIcon.style.display = 'inline';
      } else {
        answer.style.display = 'none';
        plusIcon.style.display = 'inline';
        minusIcon.style.display = 'none';
      }
    });
  });
  
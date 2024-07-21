let ShowTasks = document.querySelector('.btn2');
let aray = JSON.parse(localStorage.getItem('content')) || [];
let hidden = document.querySelector('.fa-ellipsis-vertical');

hidden.addEventListener('click', function() {
  let navbar = document.querySelector('.navbar');
  navbar.classList.toggle('hide');
});

ShowTasks.addEventListener('click', function() {
  let mode = document.querySelector('.mode');
  mode.classList.remove('hide');
  let header = document.querySelector('.btn');
  header.classList.add('disabled');
  let btn1 = document.querySelector('.btn1');
  let btn2 = document.querySelector('.btn2');
  btn1.classList.add('disabled');
  btn2.classList.add('disabled');
});

let HideTask = document.querySelector('.delet');

HideTask.addEventListener('click', function() {
  let mode = document.querySelector('.mode');
  mode.classList.add('hide');
  let input = document.getElementById('txt');
  input.value = '';
  let header = document.querySelector('.btn');
  header.classList.remove('disabled');
  let btn2 = document.querySelector('.btn2');
  btn1.classList.remove('disabled');
  btn2.classList.remove('disabled');
});

let AddTasks = document.querySelector('.add');

AddTasks.addEventListener('click', function() {
  let input = document.getElementById('txt');
  if (input.value == '') {
    return;
  }

  let task = { text: input.value, completed: false, import: false, delete: false };
  aray.push(task);
  localStorage.setItem('content', JSON.stringify(aray));
  input.value = '';
  let mode = document.querySelector('.mode');
  mode.classList.add('hide');
  let header = document.querySelector('.btn');
  header.classList.remove('disabled');
  let btn2 = document.querySelector('.btn2');
  btn2.classList.remove('disabled');
  renderTasks();
});

function renderTasks() {
  let content = document.querySelector('.content');
  content.innerHTML = ''; // Clear the existing content
  aray.forEach((task, index) => {
    let newdiv = document.createElement('div');
    let butt = document.createElement('button');
    let Paragraphe = document.createElement('p');
    Paragraphe.innerText = task.text;
    let butt1 = document.createElement('button');
    butt1.innerHTML = `<i class="fa-solid fa-trash"></i><i class="fa-solid fa-star"></i>`;
    let Insidediv = document.createElement('div');
    let div1 = document.createElement('div');
    div1.appendChild(butt);
    Insidediv.appendChild(div1);
    Insidediv.appendChild(Paragraphe);
    Insidediv.style.display = 'flex';
    Insidediv.style.justifyContent = 'start';
    Paragraphe.style.padding = '30px';
    Paragraphe.style.fontSize = "25px";
    Paragraphe.classList.add('Paragraphe');
    butt1.style.padding = '10px';
    butt1.style.marginTop = '30px';
    butt.classList.add('reduse');
    butt1.classList.add('star');
    newdiv.appendChild(Insidediv);
    let div2 = document.createElement('div');
    div2.appendChild(butt1);
    newdiv.appendChild(div2);
    newdiv.style.display = 'flex';
    newdiv.style.justifyContent = 'space-between';
    newdiv.classList.add('newdiv');
    content.appendChild(newdiv);

    if (task.completed) {
      butt.style.backgroundColor = 'green';
      Paragraphe.style.textDecoration = 'line-through';
    } else {
      butt.style.backgroundColor = 'white';
      Paragraphe.style.textDecoration = 'none';
    }

    let star = butt1.querySelector('.fa-star');
    if (task.import) {
      star.style.color = 'pink';
    } else {
      star.style.color = 'white';
    }

    let remove = butt1.querySelector('.fa-trash');
    if (task.delete) {
      newdiv.style.display = 'none';
    }

    // Add the event listener for the star (important)
    star.addEventListener('click', function() {
      task.import = !task.import;
      localStorage.setItem('content', JSON.stringify(aray));
      renderTasks();
    });

    // Add the event listener for the button
    butt.addEventListener('click', function() {
      task.completed = !task.completed;
      localStorage.setItem('content', JSON.stringify(aray));
      renderTasks();
    });

    // Remove task
    remove.addEventListener('click', function() {
      aray.splice(index, 1); // Remove the task from the array
      localStorage.setItem('content', JSON.stringify(aray)); // Update localStorage
      renderTasks(); // Re-render the tasks
    });
  });
}

// Sorting function
function sortLocal() {
    let navbar = document.querySelector('.navbar');
    navbar.classList.add('hide');
   aray.sort((a, b) => {
    // Compare the text properties of two tasks
    if (a.text.toLowerCase() < b.text.toLowerCase()) return -1;
    if (a.text.toLowerCase() > b.text.toLowerCase()) return 1;
    return 0;
  });
  //change the plann summary
  let summary = document.querySelector('.summ');
  summary.innerHTML = `<i class="fa-solid fa-list"></i> ${localStorage.getItem('butt')}`;

  localStorage.setItem('content', JSON.stringify(aray));
  renderTasks(); // Re-render tasks after sorting
}

// Hook up the sorting function to the button
let sort = document.querySelector('.butt');
sort.addEventListener('click', sortLocal);

// Initial render of tasks when the page loads
renderTasks();

let summary = document.querySelector('.summ');
let buttons = document.querySelectorAll('.but');

buttons.forEach(button => {
    button.addEventListener('click', function() {
        const buttonText = button.textContent;
        summary.innerHTML = `<i class="fa-solid fa-list"></i> ${buttonText}`;
        localStorage.setItem('butt', buttonText);
    });
});

// Load the summary content from localStorage on page load
document.addEventListener('DOMContentLoaded', function() {
  let storedSummary = localStorage.getItem('butt');
  if (storedSummary) {
    summary.innerHTML = `<i class="fa-solid fa-list"></i> ${storedSummary}`;
  }
});

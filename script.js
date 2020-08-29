let arr = [];
let me;
let inputArraySize;
const blue = '#F7ECE1';
const yellow = '#F5F749';
const red = '#D95D39';
const green = '#5BBA6F';
const black = '#423E3B';
//mint green A2FAA3

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
function resetArray() {
  let element = document.getElementById('addbarshere');
  let child = element.lastElementChild;
  while (child) {
    element.removeChild(child);
    child = element.lastElementChild;
  }
}
function generateArray() {
  resetArray();
  arr.length = 0;
  inputArraySize = Number(document.getElementById('arraysize').value);
  for (let i = 0; i < inputArraySize; ++i) {
    let randomNumber = getRandomInt(99) + 1;
    arr.push(randomNumber);
    let addhere = document.getElementById('addbarshere');
    let newbar = document.createElement('div');
    newbar.className = 'bar';
    newbar.style.height = randomNumber + 'px';
    addhere.appendChild(newbar);
  }
}
function animationArrayForBinarySearch(Array) {
  let binarySearchAnimations = [];
  let start = 0;
  let end = Number(document.getElementById('arraysize').value);
  end = end - 1;
  let found = 0;
  let x = Number(document.getElementById('searchNumber').value);
  while (start <= end) {
    let mid = Math.floor((start + end) / 2);
    if (Array[mid] === x) {
      binarySearchAnimations.push({
        mid,
        state: 'found',
      });
      console.log('match', Array[mid], x);
      found = 1;
      return binarySearchAnimations;
    }
    if (Array[mid] > x) {
      end = mid - 1;
      binarySearchAnimations.push({
        start,
        end,
        state: 'searching',
      });
      //console.log('mid higher', arr[mid], x);
    } else {
      start = mid + 1;
      binarySearchAnimations.push({
        start,
        end,
        state: 'searching',
      });
    }
  }
  if (!found) {
    binarySearchAnimations.push({
      start: start,
      end: end,
      state: 'not found',
    });
    console.log('no match', x);
  }
  return binarySearchAnimations;
}

async function doBinarySearch() {
  // doBasicSort();

  let animationArray = animationArrayForBinarySearch(arr);
  let previous;
  let bars = Array.from(document.getElementById('addbarshere').children);
  arr.sort((a, b) => a - b);
  bars.sort((a, b) => parseInt(a.style.height) - parseInt(b.style.height));
  for (let i = 0; i < animationArray.length; ++i) {
    let animationspeed = Number(
      document.getElementById('animation_speed').value
    );
    animationspeed = 1000 - animationspeed;
    let animation = animationArray[i];
    //console.log(animation.state);
    //console.log(bars);
    await sleep(animationspeed);
    if (previous) {
      if (previous.state === 'searching') {
        if (animation.start === previous.start) {
          bars[previous.end].style.backgroundColor = blue;
        } else bars[previous.start].style.backgroundColor = blue;
      } else {
        bars[previous.mid].style.backgroundColor = blue;
      }
    }
    if (animation.state === 'found') {
      bars[previous.start].style.backgroundColor = yellow;
      bars[previous.end].style.backgroundColor = yellow;
      bars[animation.mid].style.backgroundColor = green;
      await sleep(3000);
      bars[previous.start].style.backgroundColor = blue;
      bars[previous.end].style.backgroundColor = blue;
      bars[animation.mid].style.backgroundColor = blue;

      break;
    } else if (animation.state === 'searching') {
      bars[animation.start].style.backgroundColor = yellow;
      bars[animation.end].style.backgroundColor = yellow;
      await sleep(animationspeed);
    } else if (animation.state === 'not found') {
      bars[animation.start].style.backgroundColor = red;
      bars[animation.end].style.backgroundColor = red;
      console.log('not found');
      await sleep(3000);
      bars[animation.start].style.backgroundColor = blue;
      bars[animation.end].style.backgroundColor = blue;
      break;
    } else {
      bars[animation.mid].style.backgroundColor = red;
    }
    previous = animation;
  }
  if (Number.isInteger(previous.mid)) {
    await sleep(3000);
    bars[previous.mid].style.backgroundColor = blue;
  }
  return;
}

function animationArrayForBasicSort(Array) {
  let basicSortAnimations = [];
  for (let i = 0; i < Array.length; i++) {
    let min = i;
    basicSortAnimations.push({
      min: i,
      state: 'min',
    });
    for (let j = i + 1; j < Array.length; j++) {
      basicSortAnimations.push({
        min: min,
        j,
        state: 'compare',
      });
      if (Array[min] > Array[j]) {
        basicSortAnimations.push({
          min: j,
          state: 'min',
        });
        min = j;
      }
    }
    if (min !== i) {
      basicSortAnimations.push({
        min: min,
        i,
        state: 'swap',
      });
      let tmp = Array[i];
      Array[i] = Array[min];
      Array[min] = tmp;
    }
  }
  return basicSortAnimations;
}
async function doBasicSort() {
  let animationArray = animationArrayForBasicSort(arr);

  let previous;
  let bars = Array.from(document.getElementById('addbarshere').children);
  for (let i = 0; i < animationArray.length; ++i) {
    let animationspeed = Number(
      document.getElementById('animation_speed').value
    );
    animationspeed = 1000 - animationspeed;
    let animation = animationArray[i];
    await sleep(animationspeed);
    if (previous) {
      if (Number.isInteger(previous.min))
        bars[previous.min].style.backgroundColor = blue;
      if (Number.isInteger(previous.j))
        bars[previous.j].style.backgroundColor = blue;
      if (Number.isInteger(previous.i))
        bars[previous.i].style.backgroundColor = blue;
    }
    previous = animation;
    if (animation.state === 'compare') {
      bars[animation.min].style.backgroundColor = black;
      bars[animation.j].style.backgroundColor = yellow;
    } else if (animation.state === 'swap') {
      bars[animation.min].style.backgroundColor = red;
      bars[animation.i].style.backgroundColor = red;

      let temp = bars[animation.min].style.height;
      bars[animation.min].style.height = bars[animation.i].style.height;
      bars[animation.i].style.height = temp;
    } else {
      bars[animation.min].style.backgroundColor = green;
    }
  }
  if (previous) {
    if (Number.isInteger(previous.min))
      bars[previous.min].style.backgroundColor = blue;
    if (Number.isInteger(previous.j))
      bars[previous.j].style.backgroundColor = blue;
    if (Number.isInteger(previous.i))
      bars[previous.i].style.backgroundColor = blue;
  }
}
function animationArrayForLinearSearch(Array) {
  let LinearSearch = [];
  let x = Number(document.getElementById('searchNumber').value);
  let found = false;
  for (let i = 0; i < Array.length; i++) {
    if (Array[i] === x) {
      found = true;
      LinearSearch.push({
        idx: i,
        state: 'found',
      });
      break;
    } else {
      LinearSearch.push({
        idx: i,
        state: 'searching',
      });
    }
  }
  if (!found) {
    LinearSearch.push({
      idx: Array.length - 1,
      state: 'not-found',
    });
  }
  return LinearSearch;
}

async function dolinearSearch() {
  let animationArray = animationArrayForLinearSearch(arr);
  let previous;
  let bars = Array.from(document.getElementById('addbarshere').children);
  for (let i = 0; i < animationArray.length; ++i) {
    let animationspeed = Number(
      document.getElementById('animation_speed').value
    );
    animationspeed = 1000 - animationspeed;
    let animation = animationArray[i];
    await sleep(animationspeed);
    if (previous) {
      if (Number.isInteger(previous.idx))
        bars[previous.idx].style.backgroundColor = blue;
    }
    previous = animation;
    if (animation.state === 'found') {
      bars[animation.idx].style.backgroundColor = green;
      await sleep(1000);
      bars[animation.idx].style.backgroundColor = blue;
    } else if (animation.state === 'searching') {
      bars[animation.idx].style.backgroundColor = yellow;
    } else if (animation.state === 'not-found') {
      bars[animation.idx].style.backgroundColor = red;
      await sleep(1000);
      bars[animation.idx].style.backgroundColor = blue;
    }
  }
}

async function merge(a, low, m, high) {
  var i, j, k;
  var temp = [];
  var len = m - low;
  // console.log(len, 'arr: ', a);
  let bars = Array.from(document.getElementById('addbarshere').children);
  let animationspeed = Number(document.getElementById('animation_speed').value);
  for (i = 0; i < len; i++) {
    temp[i] = a[low + i];
  }
  for (var x = low; x < high; x++) {
    bars[x].style.backgroundColor = red;
  }
  await sleep(animationspeed);
  for (var x = low; x < high; x++) {
    bars[x].style.backgroundColor = blue;
  }

  i = 0;
  j = m;
  k = low;
  while (i < len && j < high) {
    let animationspeed = Number(
      document.getElementById('animation_speed').value
    );
    if (temp[i] <= a[j]) {
      console.log('1:if fst loop tmp: ', temp[i], 'arr j ', a[j]);
      var temph = bars[k].style.height;
      bars[k].style.backgroundColor = yellow;
      bars[k].style.height = temp[i] + 'px';
      var index;
      for (var x = low; x < bars.length; x++) {
        if (bars[x].style.height == temp[i] + 'px') {
          bars[x].style.backgroundColor = yellow;
          bars[x].style.height = temph;
          index = x;
          break;
        }
      }
      await sleep(animationspeed);
      bars[k].style.backgroundColor = blue;
      bars[index].style.backgroundColor = blue;
      a[k++] = temp[i++];
    } else {
      console.log('2:else fst loop j: ', a[j], ' tmp ', temp[i], ' array ', a);
      bars[k].style.backgroundColor = yellow;
      bars[j].style.backgroundColor = yellow;
      var temph = bars[k].style.height;
      bars[k].style.height = bars[j].style.height;
      bars[j].style.height = temph;

      // for(var x=0;x<bars.length;x++)
      // {
      //   if(bars[x].style.height==temp[i]+'px')
      //   {
      //     bars[x].style.backgroundColor=yellow;
      //     bars[x].style.height=temph;
      //     break;
      //   }
      // }

      await sleep(animationspeed);
      bars[k].style.backgroundColor = blue;
      bars[j].style.backgroundColor = blue;
      a[k++] = a[j++];
    }
  }
  while (i < len) {
    let animationspeed = Number(
      document.getElementById('animation_speed').value
    );
    var temph = bars[k].style.height;
    bars[k].style.backgroundColor = yellow;
    bars[k].style.height = temp[i] + 'px';
    var index;
    for (var x = low; x < bars.length; x++) {
      if (bars[x].style.height == temp[i] + 'px') {
        bars[x].style.backgroundColor = yellow;
        bars[x].style.height = temph;
        index = x;
        break;
      }
    }
    await sleep(animationspeed);
    bars[k].style.backgroundColor = blue;
    bars[index].style.backgroundColor = blue;
    a[k++] = temp[i++];
  }
}

async function mergesort(a, low, high) {
  if (high - low > 1) {
    var m = low + ((high - low) >> 1);
    await mergesort(a, low, m);
    await mergesort(a, m, high);
    await merge(a, low, m, high);
  }
}

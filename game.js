 const WIN_LINES = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];


  let board = Array(9).fill(null);
  let turn = 'X';
  let over = false;
  let scores = { X: 0, O: 0, D: 0 };


  const cells = document.querySelectorAll('.cell');
  const statusEl = document.getElementById('status');


  function setStatus(html) {
    statusEl.innerHTML = html;
  }


  function turnMsg(t) {
    const dotClass = t === 'X' ? 'x' : 'o';
    return `<span><span class="dot ${dotClass}"></span><span class="highlight">${t}'s turn</span></span>`;
  }


  function checkWin(b, player) {
    return WIN_LINES.find(line => line.every(i => b[i] === player)) || null;
  }


  function updateScores() {
    document.getElementById('score-x').textContent = scores.X;
    document.getElementById('score-o').textContent = scores.O;
    document.getElementById('score-d').textContent = scores.D;
  }


  cells.forEach(cell => {
    cell.addEventListener('click', () => {
      const i = +cell.dataset.i;
      if (over || board[i]) return;


      board[i] = turn;
      cell.textContent = turn;
      cell.classList.add('taken', turn.toLowerCase());


      const winLine = checkWin(board, turn);
      if (winLine) {
        winLine.forEach(wi => cells[wi].classList.add('win'));
        scores[turn]++;
        updateScores();
        const color = turn === 'X' ? '#185FA5' : '#993C1D';
        setStatus(`<span style="color:${color};font-weight:600">${turn} wins! 🎉</span>`);
        over = true;
        return;
      }


      if (board.every(Boolean)) {
        scores.D++;
        updateScores();
        setStatus(`<span style="color:#888;font-weight:500">It's a draw!</span>`);
        over = true;
        return;
      }


      turn = turn === 'X' ? 'O' : 'X';
      setStatus(turnMsg(turn));
    });
  });


  document.getElementById('btn-reset').addEventListener('click', () => {
    board = Array(9).fill(null);
    over = false;
    turn = 'X';
    cells.forEach(c => { c.textContent = ''; c.className = 'cell'; });
    setStatus(turnMsg('X'));
  });


  document.getElementById('btn-clear').addEventListener('click', () => {
    scores = { X: 0, O: 0, D: 0 };
    updateScores();
    document.getElementById('btn-reset').click();
  });


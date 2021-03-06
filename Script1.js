// JavaScript source code


        var canvas = document.getElementById('tutorial');
        if (canvas.getContext) {
            var ctx = canvas.getContext('2d');
        }

        var score = new Score();
        //�����
        var ball = new Circle(canvas.width / 2, 770, 10, "#222", 2,-2);
        //�������
        var rocket = new MyRect(250, 780, 100, 15, "#252");
        //�����
        var bricks = new Bricks();
        bricks.create();

        canvas.onmousedown = mouseMoveOn;
        canvas.onmouseup = mouseMoveOff;
        canvas.onkeydown = keydownOn;
       // canvas.onkeyup = keyupOff;
        document.addEventListener("keydown", keydownOn, false);
        //������ ����
        var interval=  setInterval(draw, 10);


//tyytysdsfwrfwerfgerfgfgfgfg


        // ����� �����
        function Circle(x,y,radius,color,dx,dy)      
        {
            this.radius = radius;
            this.x = x;
            this.y = y;
            this.color = color;
            this.dx = dx;
            this.dy = dy;

            this.draw = function (ctx) {
                ctx.fillStyle = this.color; 
                 ctx.beginPath();            
                ctx.arc(this.x, this.y, radius, 0, (Math.PI / 180) * 360, false);           
                ctx.fill();
              
                ctx.closePath();
            }
             
             this.move=function()
             {
                this.x += this.dx;
                this.y += this.dy;
             }
        }

        //����� ��� �������������
        function MyRect(x, y, width, height, color) {
            this.x = x;
            this.y = y;
            this.width = width;
            this.height = height;
            this.color = color;

            this.draw = function (ctx) {
                ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.fillRect(this.x, this.y, this.width, this.height);

                ctx.closePath();
            }
        }

        //����� ����
        function Brick(x, y, width, height, color) {
            MyRect.call(this, x, y, width, height, color);

            this.isAlive = true;
        }

        //����� �����
        function Bricks(xLength = 12, yLength = 9) {
            this.bricks = [];
            //���������� ������ ������
            this.length = 0;
            this.xLength = xLength;
            this.yLength = yLength;

            this.create = function () {
                for (var j = 0; j < yLength; ++j) {
                    this.bricks[j] = [];
                    for (var i = 0; i < xLength; ++i) {
                        switch (j) {
                            case 0:
                                this.bricks[j][i] = new Brick(i * 51 + 1, j * 20 + 51, 50, 20, "#abc");
                                break;
                            case 1:
                                this.bricks[j][i] = new Brick(i * 51 + 1, j * 20 + 52, 50, 20, "#ac2");
                                break;
                            case 2:
                                this.bricks[j][i] = new Brick(i * 51 + 1, j * 20 + 53, 50, 20, "#bb8");
                                break;
                            case 3:
                                this.bricks[j][i] = new Brick(i * 51 + 1, j * 20 + 54, 50, 20, "#c93");
                                break;
                            case 4:
                                this.bricks[j][i] = new Brick(i * 51 + 1, j * 20 + 55, 50, 20, "#5b7");
                                break;
                            case 5:
                                this.bricks[j][i] = new Brick(i * 51 + 1, j * 20 + 56, 50, 20, "#666");
                                break;
                            case 6:
                                this.bricks[j][i] = new Brick(i * 51 + 1, j * 20 + 57, 50, 20, "#ac6");
                                break;
                            case 7:
                                this.bricks[j][i] = new Brick(i * 51 + 1, j * 20 + 58, 50, 20, "#6d9");
                                break;
                            case 8:
                                this.bricks[j][i] = new Brick(i * 51 + 1, j * 20 + 59, 50, 20, "#08f");
                                break;
                            case 9:
                                this.bricks[j][i] = new Brick(i * 51 + 1, j * 20 + 60, 50, 20, "#778");
                                break;
                        }
                        this.length++;
                    }
                }
            }

            this.drawBlocks = function () {

                for (var j = 0; j < yLength; ++j) {
                    bricks[j] = [];
                    for (var i = 0; i < xLength; ++i) {
                        if (bricks.bricks[j][i].isAlive)
                            bricks.bricks[j][i].draw(ctx);
                    }
                }

            }
        }
      

        
        //������� �����
        function Score()
        {
            this.score = 0;

            this.draw = function (ctx) {
                ctx.beginPath();
                ctx.font = "16px Arial";
                ctx.fillStyle = "#000";
                ctx.fillText("Score: " + score.score, canvas.width / 2 - 20, 20);
                ctx.closePath();
            }
        }

        // �������� ������
        function playerMove(e) {         
            var x = e.offsetX;

            if (x > rocket.width / 2 && x < canvas.width- rocket.width/2) {
                rocket.x = x -rocket.width / 2;
             }
         
        }

        // ��������� ����
        function draw() {                   
            ctx.clearRect(0, 0, canvas.width, canvas.height);
       
            bricks.drawBlocks(ctx);                            
            ball.draw(ctx);
            rocket.draw(ctx);
            score.draw(ctx);

            checkColission(canvas,rocket,bricks,score);
            ball.move();
          
        }

        //�-��� ���������� ��������
        function playerMoveKey(e) {
            if (e.keyCode == 37)
                rocket.x -= 1;
        }
        function keydownOn(e) {
            if (e.keyCode == 37) {
                if (rocket.x > 0)
                    rocket.x -= 7;
            }
            if (e.keyCode == 39) {
                if (rocket.x < canvas.width - rocket.width)
                    rocket.x += 7;
            }
        }
        function mouseMoveOn(e) {
            if (e.which == 1)
                canvas.onmousemove = playerMove;
        }

        function mouseMoveOff(e) {
            if (e.which == 1)
                canvas.onmousemove = undefined;
        }

    

    //�������� �� ������������
        function checkColission(canvas, rocket, bricks, score) {
            //� �������
            for (var i = 0; i < bricks.bricks.length; ++i) {
                for (var j = 0; j < bricks.bricks[i].length; ++j) {
                    if (ball.x >= bricks.bricks[i][j].x && ball.x <= bricks.bricks[i][j].width + bricks.bricks[i][j].x && ball.y + ball.radius >= bricks.bricks[i][j].y && ball.y + ball.radius <= bricks.bricks[i][j].y + bricks.bricks[i][j].height && bricks.bricks[i][j].isAlive == true) {
                        bricks.bricks[i][j].isAlive = false;
                        sound(i * 100);
                       
                        ball.dy = -ball.dy;
                        score.score += 1;
                       // rocket.width -= 1;
                    }
                }
            }
            //� ��������
            if (ball.x  >= rocket.x && ball.x <= (rocket.x + rocket.width) && ball.y  == 770 + ball.radius) {
                if (ball.x <= rocket.x + rocket.width / 2 - 30)
                {
                    ball.dy = -ball.dy;
                    ball.dx = ball.dx +1;
                }
                else if (ball.x  >= rocket.x + rocket.width / 2 + 30)
                {
                    ball.dy = -ball.dy;
                    ball.dx = ball.dx -1;
                }
                else
                {
                    ball.dy = -ball.dy;                   
                }
               
                   sound(100);
            }
            //�� �������
            if (ball.x + ball.dx > canvas.width - ball.radius || ball.x + ball.dx < ball.radius) {
                ball.dx = -ball.dx;
            }

            if (ball.y + ball.dy < ball.radius+50) {
                ball.dy = -ball.dy;
            }
            if (ball.y + ball.dy > canvas.height - ball.radius) {
              //   sound(100, 500); sound(300, 700); sound(400, 1100);
                clearInterval(interval);
                alert("Game over \nYour score is " + score.score);
                 document.location.reload();
            }
            //�������� �� ������
            if (bricks.length == score.score)
            {
                alert("You won!!!");
                document.location.reload();
            }


        }


        function sound(freq = 200, dur = 100) {
            // ������� ����� ��������
            var audioCtx = new (window.AudioContext || window.webkitAudioContext)();

            // ������� OscillatorNode - ���������
            var oscillator = audioCtx.createOscillator();

            oscillator.type = 'square';
            // ������ ������� � ������
            oscillator.frequency.setValueAtTime(freq, audioCtx.currentTime);
            oscillator.connect(audioCtx.destination);

            // ��������� 
            oscillator.start();
            //���� ����� 300 ��
            setTimeout(e => oscillator.stop(), dur);
        }
     
     
       

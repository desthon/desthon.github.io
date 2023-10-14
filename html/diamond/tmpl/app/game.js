'#snippet';
/*
    author:xinglie.lkf@taobao.com
 */
'ref@./default.css';
var Magix = require('magix');
Magix.applyStyle('@game.css');
var GameLevels = [
        [[-1, -1, 0, 0, 0, -1, -1],
        [-1, -1, 0, 1, 0, -1, -1],
        [0, 0, 1, 1, 1, 0, 0],
        [0, 0, 0, 1, 0, 0, 0],
        [0, 0, 0, 1, 0, 0, 0],
        [-1, -1, 0, 0, 0, -1, -1],
        [-1, -1, 0, 0, 0, -1, -1]],

        [[-1, -1, 0, 0, 0, -1, -1],
        [-1, -1, 0, 1, 0, -1, -1],
        [0, 0, 0, 1, 0, 0, 0],
        [0, 1, 1, 1, 1, 1, 0],
        [0, 0, 0, 1, 0, 0, 0],
        [-1, -1, 0, 1, 0, -1, -1],
        [-1, -1, 0, 0, 0, -1, -1]],

        [[-1, -1, 0, 1, 0, -1, -1],
        [-1, -1, 0, 1, 0, -1, -1],
        [0, 1, 1, 1, 1, 1, 0],
        [0, 0, 0, 1, 0, 0, 0],
        [0, 0, 0, 1, 0, 0, 0],
        [-1, -1, 1, 1, 1, -1, -1],
        [-1, -1, 1, 1, 1, -1, -1]],

        [[-1, -1, 0, 1, 0, -1, -1],
        [-1, -1, 1, 1, 1, -1, -1],
        [0, 1, 1, 1, 1, 1, 0],
        [0, 0, 0, 1, 0, 0, 0],
        [0, 0, 0, 1, 0, 0, 0],
        [-1, -1, 1, 1, 1, -1, -1],
        [-1, -1, 1, 1, 1, -1, -1]],

        [[-1, -1, 0, 0, 0, -1, -1],
        [-1, -1, 0, 0, 0, -1, -1],
        [0, 0, 0, 1, 0, 0, 0],
        [0, 0, 1, 1, 1, 0, 0],
        [0, 1, 1, 1, 1, 1, 0],
        [-1, -1, 0, 0, 0, -1, -1],
        [-1, -1, 0, 0, 0, -1, -1]],

        [[-1, -1, 0, 0, 0, -1, -1],
        [-1, -1, 0, 1, 0, -1, -1],
        [0, 0, 1, 1, 1, 0, 0],
        [0, 1, 1, 1, 1, 1, 0],
        [1, 1, 1, 1, 1, 1, 1],
        [-1, -1, 0, 0, 0, -1, -1],
        [-1, -1, 0, 0, 0, -1, -1]],

        [[-1, -1, 0, 1, 0, -1, -1],
        [-1, -1, 1, 1, 1, -1, -1],
        [0, 1, 1, 1, 1, 1, 0],
        [1, 1, 1, 1, 1, 1, 1],
        [0, 1, 1, 1, 1, 1, 0],
        [-1, -1, 1, 1, 1, -1, -1],
        [-1, -1, 0, 0, 0, -1, -1]],

        [[-1, -1, 1, 1, 1, -1, -1],
        [-1, -1, 1, 1, 1, -1, -1],
        [1, 1, 0, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1],
        [-1, -1, 1, 1, 1, -1, -1],
        [-1, -1, 1, 1, 1, -1, -1]],

        [[-1, -1, 1, 1, 1, -1, -1],
        [-1, -1, 1, 1, 1, -1, -1],
        [1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 0, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1],
        [-1, -1, 1, 1, 1, -1, -1],
        [-1, -1, 1, 1, 1, -1, -1]]
    ];
var GameLevelsDesc = {
    '8': '传统型',
    '7': '戴维斯跳跃',
    '6': '五边形',
    '5': '大金字塔',
    '4': '金字塔',
    '3': '台灯',
    '2': '古字形',
    '1': '大十字',
    '0': '十字架'
};
var GameLevelsChar = '一二三四五六七八九'.split('');
var GameResultLevel = {
    5: '颇好',
    4: '很好',
    3: '聪明',
    2: '尖子',
    1: '大师'
};
var $ = require('zepto');
var DD = require('libs/dragdrop');
module.exports = Magix.View.extend({
    tmpl: '@game.html',
    ctor: function() {
        var me = this;
        me.$level = 0;
    },
    render: function() {
        var me = this;
        me.setLevel(me.$level);
    },
    setLevel: function(level) {
        var me = this;
        var map = GameLevels[level];
        var cloned = [];
        for (var i = 0; i < map.length; i++) {
            cloned.push(map[i].slice());
        }
        me.$map = cloned;
        me.$levelDesc = GameLevelsDesc[level];
        me.$levelTip = '第' + GameLevelsChar[level] + '关';
        me.drawStage();
    },
    drawStage: function() {
        var me = this;
        me.updater.digest({
            size: me.$map,
            desc: me.$levelDesc,
            tip: me.$levelTip
        });
    },
    changeLevel: function(toNext) {
        var total = GameLevels.length - 1,
            me = this,
            set;
        if (toNext) {
            if (me.$level < total) {
                me.$level++;
                set = 1;
            }
        } else {
            if (me.$level > 0) {
                me.$level--;
                set = 1;
            }
        }
        if (set)
            me.setLevel(me.$level);
    },
    isOverOrPass: function() {
        var t = this,
            map = t.$map,
            result = {},
            chess = 0,
            isEnd = true;
        for (var i = 0, j = map.length, toy = j - 2; i < j; i++) {
            for (var a = 0, b = map[i].length, tox = b - 2; a < b; a++) {
                if (map[i][a] != -1) {
                    if (map[i][a]) chess++;
                    if (i < toy) {
                        if (a < tox) {
                            if (map[i][a] == 1) {
                                if (map[i][a + 1] == 1 && map[i][a + 2] === 0) {

                                    isEnd = false;
                                    break;
                                } else if (map[i + 1][a] == 1 && map[i + 2][a] === 0) {
                                    isEnd = false;
                                    break;
                                }
                            } else if (map[i][a] === 0) {
                                if (map[i][a + 1] == 1 && map[i][a + 2] == 1) {
                                    isEnd = false;
                                    break;
                                } else if (map[i + 1][a] == 1 && map[i + 2][a] == 1) {
                                    isEnd = false;
                                    break;
                                }
                            }
                        } else {
                            if (map[i][a] == 1) {
                                if (map[i + 1][a] == 1 && map[i + 2][a] === 0) {
                                    isEnd = false;
                                    break;
                                }
                            } else if (map[i][a] === 0) {
                                if (map[i + 1][a] == 1 && map[i + 2][a] == 1) {
                                    isEnd = false;
                                    break;
                                }
                            }
                        }
                    } else {
                        if (map[i][a] == 1) {
                            if (map[i][a + 1] == 1 && map[i][a + 2] === 0) {
                                isEnd = false;
                                break;
                            }
                        } else if (map[i][a] === 0) {
                            if (map[i][a + 1] == 1 && map[i][a + 2] == 1) {
                                isEnd = false;
                                break;
                            }
                        }
                    }
                }
            }
            if (!isEnd) break;
        }
        result.isOver = isEnd;
        result.isPass = (isEnd && chess == 1 && map[3][3] == 1);
        result.chess = chess;
        return result;
    },
    findDropPos: function(pos, igr) {
        var result = null;
        var me = this;
        var node = $('#' + me.id);
        var offset = node.offset();
        var tx = pos.x - offset.left;
        var ty = pos.y - offset.top;
        var cdx = (tx / 60) | 0;
        var cdy = (ty / 60) | 0;
        if ((cdx < me.$map[0].length && cdy < me.$map.length) && (!igr || igr.x != cdx || igr.y != cdy)) {
            result = {
                x: cdx,
                y: cdy
            };
        }
        return result;
    },
    findEatList: function(startPos, endPos) {
        var me = this,
            result = {
                can: false,
                eatList: []
            },
            flag = true,
            tempList = [],
            bad = false;
        var map = me.$map;
        if (map[endPos.y][endPos.x]) return result;
        startPos = {
            x: startPos.x,
            y: startPos.y
        };
        if (startPos.y == endPos.y) {
            while (startPos.x != endPos.x) {
                if (endPos.x > startPos.x) startPos.x++;
                else startPos.x--;
                if (flag) {
                    if (map[startPos.y][startPos.x] == 1) {
                        tempList.push({
                            x: startPos.x,
                            y: startPos.y
                        });
                        flag = false;
                    } else {
                        bad = true;
                        break;
                    }
                } else if (startPos.x != endPos.x) {
                    if (map[startPos.y][startPos.x] === 0) {
                        flag = true;
                    } else {
                        bad = true;
                        break;
                    }
                }
            }
            if (!bad) {
                result.can = true;
                result.eatList = tempList;
            }
        } else if (startPos.x == endPos.x) {
            while (startPos.y != endPos.y) {
                if (endPos.y > startPos.y) startPos.y++;
                else startPos.y--;
                if (flag) {
                    if (map[startPos.y][startPos.x] == 1) {
                        tempList.push({
                            x: startPos.x,
                            y: startPos.y
                        });
                        flag = false;
                    } else {
                        bad = true;
                        break;
                    }
                } else if (startPos.y != endPos.y) {
                    if (map[startPos.y][startPos.x] === 0) {
                        flag = true;
                    } else {
                        bad = true;
                        break;
                    }
                }
            }
            if (!bad) {
                result.can = true;
                result.eatList = tempList;
            }
        }
        return result;
    },
    dropIt: function(startPos, endPos, eatList) {
        var me = this;
        var map = me.$map;
        var node = $('#main_' + endPos.x + '_' + endPos.y);
        node.append('<img src="build/images/normal.gif" x="' + endPos.x + '" y="' + endPos.y + '" mx-mousedown="dragIt()" />');
        map[startPos.y][startPos.x] = 0;
        map[endPos.y][endPos.x] = 1;
        for (var i = 0, j = eatList.length, item; i < j; i++) {
            item = eatList[i];
            map[item.y][item.x] = 0;
            $('#main_' + item.x + '_' + item.y).empty();
        }
    },
    'dragIt<mousedown>': function(e) {
        var me = this;
        var target = $(e.eventTarget);
        var active = $('#active');
        var offset = target.offset();
        target.hide();
        active.css(offset).show();
        var currentX, currentY;
        var dragCDX = target.attr('x');
        var dragCDY = target.attr('y');
        var dragPos = {
            x: dragCDX,
            y: dragCDY
        };
        var lastNode, lastPos;
        var resultNode = $('#result');
        DD.begin(active[0], function(event) {
            event.preventDefault();
            currentX = event.pageX - e.pageX + offset.left;
            currentY = event.pageY - e.pageY + offset.top;
            active.css({
                left: currentX,
                top: currentY
            });
            var p = me.findDropPos({
                x: event.pageX,
                y: event.pageY
            }, dragPos);
            var r = p != lastPos;
            if (p && lastPos) {
                r = p.x != lastPos.x || p.y != lastPos.y;
            }
            if (r) {
                lastPos = p;
                if (lastNode && lastNode.length) {
                    lastNode.css({
                        opacity: 1
                    }).removeClass('@game.css:succ').removeClass('@game.css:fail');
                }
                if (p) {
                    lastNode = $('#main_' + p.x + '_' + p.y);
                    if (lastNode.length) {
                        lastNode.css({
                            opacity: 0.7
                        });
                        var s = me.findEatList(dragPos, p);
                        if (s.can) {
                            lastNode.addClass('@game.css:succ');
                        } else {
                            lastNode.addClass('@game.css:fail');
                        }
                    }
                }
            }
        }, function(event) {
            var pos = me.findDropPos({
                x: event.pageX,
                y: event.pageY
            }, dragPos);
            if (pos) {
                var s = me.findEatList(dragPos, pos);
                if (s.can) {
                    me.dropIt(dragPos, pos, s.eatList);
                    s = me.isOverOrPass();
                    if (s.isOver) {
                        resultNode.html('游戏结束，没有可以移动的青蛙了～');
                        var score;
                        if (s.isPass) {
                            score = '天才！';
                        } else if (GameResultLevel[s.chess]) {
                            score = GameResultLevel[s.chess] + '，还有' + s.chess + '个青蛙';
                        } else {
                            score = '一般' + '，还有' + s.chess + '个青蛙';
                        }
                        resultNode.append('<br />您的成绩是：' + score);
                        resultNode.append('<br />单击上下一关或重新开始新的游戏');
                    }
                } else {
                    target.show();
                }
            } else {
                target.show();
            }
            active.hide();
            if (lastNode && lastNode.length) {
                lastNode.css({
                    opacity: 1
                }).removeClass('@game.css:succ').removeClass('@game.css:fail');
            }
        });
    },
    'next<click>': function() {
        this.changeLevel(true);
    },
    'prev<click>': function() {
        this.changeLevel();
    },
    'restart<click>': function() {
        this.setLevel(this.$level);
    }
});
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var RenderElement = /** @class */ (function () {
    // Constructor
    function RenderElement(id, content, parent) {
        if (id === void 0) { id = null; }
        if (content === void 0) { content = null; }
        if (parent === void 0) { parent = null; }
        this.id = id;
        this.content = content;
        this.parent = parent;
    }
    // Public methods
    RenderElement.prototype.update = function () {
        if (this.id) {
            $("#".concat(this.id)).html(this.render());
        }
        if (this.parent) {
            this.parent.update();
        }
    };
    RenderElement.prototype.render = function () {
        this.str = "";
        var content = this.getContent();
        if (content) {
            this.str += content;
        }
        return this.str;
    };
    RenderElement.prototype.getContent = function () {
        return this.content;
    };
    RenderElement.prototype.setContent = function (content) {
        this.content = content;
    };
    RenderElement.prototype.getId = function () {
        return this.id;
    };
    RenderElement.prototype.getParent = function () {
        return this.parent;
    };
    return RenderElement;
}());
/// <reference path="RenderElement.ts" />
var RenderArea = /** @class */ (function (_super) {
    __extends(RenderArea, _super);
    // Constructor
    function RenderArea(id, parent) {
        if (id === void 0) { id = null; }
        if (parent === void 0) { parent = null; }
        var _this = _super.call(this, id, null, parent) || this;
        _this.elements = [];
        _this.links = [];
        return _this;
    }
    // Public methods
    RenderArea.getBrTagElement = function (parent) {
        if (parent === void 0) { parent = null; }
        return new RenderTagElement(null, null, parent, RenderTagElementType.BR);
    };
    RenderArea.prototype.render = function () {
        var _this = this;
        this.str = "";
        this.elements.forEach(function (t) {
            _this.str += t.render();
        });
        return this.str;
    };
    RenderArea.prototype.addElements = function () {
        var _this = this;
        var elements = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            elements[_i] = arguments[_i];
        }
        elements.forEach(function (e) { return _this.elements.push(e); });
    };
    RenderArea.prototype.removeAllElements = function () {
        this.elements = [];
    };
    RenderArea.prototype.addLinks = function () {
        var _this = this;
        var links = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            links[_i] = arguments[_i];
        }
        links.forEach(function (l) { return _this.links.push(l); });
    };
    RenderArea.prototype.removeAllLinks = function () {
        this.links = [];
    };
    RenderArea.prototype.runLinks = function () {
        for (var i = 0; i < this.links.length; i++) {
            this.links[i].run();
        }
        for (var i = 0; i < this.elements.length; i++) {
            if (this.elements[i] instanceof RenderArea) {
                var renderArea = this.elements[i];
                renderArea.runLinks();
            }
        }
    };
    return RenderArea;
}(RenderElement));
/// <reference path="RenderArea.ts" />
var Board = /** @class */ (function (_super) {
    __extends(Board, _super);
    // Constructor
    function Board(parent) {
        if (parent === void 0) { parent = null; }
        var _this = _super.call(this, null, parent) || this;
        _this.reset();
        return _this;
    }
    // Public methods
    Board.prototype.toArray = function () {
        return this.squares.map(function (s) { return s.sign == TicTacToeSign.NO_SIGN ? s.index : s.sign; });
    };
    Board.prototype.reset = function () {
        this.removeAllElements();
        this.removeAllLinks();
        this.squares = [];
        for (var rowIndex = 0; rowIndex < Board.NUM_ROWS; rowIndex++) {
            var row = new Row(this);
            for (var colIndex = 0; colIndex < Board.NUM_COLS; colIndex++) {
                var index = (rowIndex * Board.NUM_COLS) + colIndex;
                var square = new Square(row, index);
                row.addSquare(square);
                this.squares.push(square);
            }
            this.addElements(row);
            if (rowIndex != Board.NUM_ROWS - 1) {
                this.addElements(new RowSeparator());
            }
        }
        this.update();
    };
    Board.NUM_ROWS = 3;
    Board.NUM_COLS = 3;
    return Board;
}(RenderArea));
var CallbackCollection = /** @class */ (function () {
    // Constructor
    function CallbackCollection() {
        var callbacks = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            callbacks[_i] = arguments[_i];
        }
        this.callbacks = [];
        this.callbacks = callbacks;
    }
    // Public methods
    CallbackCollection.prototype.addCallback = function (callback) {
        this.callbacks.push(callback);
        return this;
    };
    CallbackCollection.prototype.fire = function () {
        for (var i = 0; i < this.callbacks.length; i++) {
            this.callbacks[i]();
        }
    };
    CallbackCollection.prototype.reset = function () {
        this.callbacks = [];
    };
    return CallbackCollection;
}());
var Content = /** @class */ (function (_super) {
    __extends(Content, _super);
    // Constructor
    function Content() {
        var _this = _super.call(this, "content") || this;
        _this.board = new Board(_this);
        _this.resetButton = new ResetButton(_this);
        _this.status = new Status(_this);
        _this.addElements(_this.status, RenderArea.getBrTagElement(), RenderArea.getBrTagElement(), _this.board, RenderArea.getBrTagElement(), RenderArea.getBrTagElement(), _this.resetButton);
        _this.addLinks(new RenderLinkClick("#".concat(_this.resetButton.getId()), new CallbackCollection(_this.reset.bind(_this))));
        _this.update();
        return _this;
    }
    // Public methods
    Content.prototype.update = function () {
        _super.prototype.update.call(this);
        this.runLinks();
    };
    Content.prototype.getStatus = function () {
        return this.status;
    };
    // Private methods
    Content.prototype.reset = function () {
        this.board.reset();
        this.status.reset();
    };
    return Content;
}(RenderArea));
var Game = /** @class */ (function () {
    // Constructor
    function Game() {
        this.title = new Title();
        this.content = new Content();
    }
    return Game;
}());
// source: https://medium.freecodecamp.org/how-to-make-your-tic-tac-toe-game-unbeatable-by-using-the-minimax-algorithm-9d690bad4b37
var MinimaxAlgorithm = /** @class */ (function () {
    function MinimaxAlgorithm() {
    }
    // Public methods
    MinimaxAlgorithm.run = function (board, sign) {
        var availableSpots = this.emptyIndices(board);
        // checks for the terminal states such as win, lose, and tie and returning a value accordingly
        if (this.winning(board, TicTacToeSign.X)) {
            return new MinimaxAlgorithmReturnValue(null, -10);
        }
        else if (this.winning(board, TicTacToeSign.O)) {
            return new MinimaxAlgorithmReturnValue(null, 10);
        }
        else if (availableSpots.length === 0) {
            return new MinimaxAlgorithmReturnValue(null, 0);
        }
        // an board to collect all the objects
        var moves = [];
        // loop through available spots
        for (var i = 0; i < availableSpots.length; i++) {
            // create an object for each and store the index of that spot 
            var move = new MinimaxAlgorithmReturnValue(board[availableSpots[i]]);
            // set the empty spot to the current player
            board[availableSpots[i]] = sign;
            // collect the score resulted from calling minimax on the opponent of the current player
            var result = this.run(board, sign == TicTacToeSign.O ? TicTacToeSign.X : TicTacToeSign.O);
            move.score = result.score;
            // reset the spot to empty
            board[availableSpots[i]] = move.index;
            // push the object to the board
            moves.push(move);
        }
        // if it is the computer's turn loop over the moves and choose the move with the highest score
        var bestMoveIndex;
        var bestScore;
        if (sign === TicTacToeSign.O) {
            bestScore = -10000;
            for (var i = 0; i < moves.length; i++) {
                if (moves[i].score > bestScore) {
                    bestScore = moves[i].score;
                    bestMoveIndex = i;
                }
            }
        }
        else {
            // else loop over the moves and choose the move with the lowest score
            bestScore = 10000;
            for (var i = 0; i < moves.length; i++) {
                if (moves[i].score < bestScore) {
                    bestScore = moves[i].score;
                    bestMoveIndex = i;
                }
            }
        }
        // return the chosen move (object) from the moves board
        return moves[bestMoveIndex];
    };
    MinimaxAlgorithm.winning = function (board, sign) {
        return ((board[0] == sign) && (board[1] == sign) && (board[2] == sign))
            || ((board[3] == sign) && (board[4] == sign) && (board[5] == sign))
            || ((board[6] == sign) && (board[7] == sign) && (board[8] == sign))
            || ((board[0] == sign) && (board[3] == sign) && (board[6] == sign))
            || ((board[1] == sign) && (board[4] == sign) && (board[7] == sign))
            || ((board[2] == sign) && (board[5] == sign) && (board[8] == sign))
            || ((board[0] == sign) && (board[4] == sign) && (board[8] == sign))
            || ((board[2] == sign) && (board[4] == sign) && (board[6] == sign));
    };
    // Private methods
    MinimaxAlgorithm.emptyIndices = function (board) {
        return board.filter(function (s) { return (s != TicTacToeSign.X) && (s != TicTacToeSign.O); });
    };
    return MinimaxAlgorithm;
}());
var MinimaxAlgorithmReturnValue = /** @class */ (function () {
    // Constructor
    function MinimaxAlgorithmReturnValue(index, score) {
        if (index === void 0) { index = null; }
        if (score === void 0) { score = null; }
        this.index = index;
        this.score = score;
    }
    return MinimaxAlgorithmReturnValue;
}());
var RenderClass = /** @class */ (function () {
    // Constructor
    function RenderClass(classType) {
        this.classType = classType;
    }
    // Public methods
    RenderClass.prototype.toString = function () {
        return this.classType;
    };
    RenderClass.prototype.getClassType = function () {
        return this.classType;
    };
    return RenderClass;
}());
var RenderClassType;
(function (RenderClassType) {
    RenderClassType["ASCII_REAL_BUTTON"] = "asciiRealButton";
    RenderClassType["CURSOR_NOT_ALLOWED"] = "cursorNotAllowed";
    RenderClassType["CURSOR_POINTER"] = "cursorPointer";
    RenderClassType["SQUARE"] = "square";
})(RenderClassType || (RenderClassType = {}));
var RenderLink = /** @class */ (function () {
    // Constructor
    function RenderLink() {
    }
    // Public methods
    RenderLink.prototype.run = function () {
    };
    return RenderLink;
}());
var RenderLinkClick = /** @class */ (function (_super) {
    __extends(RenderLinkClick, _super);
    // Constructor
    function RenderLinkClick(element, callbackCollection) {
        var _this = _super.call(this) || this;
        _this.element = element;
        _this.callbackCollection = callbackCollection;
        return _this;
    }
    // Public methods
    RenderLinkClick.prototype.run = function () {
        var renderLink = this;
        $(this.element).click(function (event) {
            renderLink.callbackCollection.fire();
            return false; // Avoid event bubbling
        });
    };
    return RenderLinkClick;
}(RenderLink));
var RenderTagElement = /** @class */ (function (_super) {
    __extends(RenderTagElement, _super);
    // Constructor
    function RenderTagElement(id, content, parent, tagType, hasClosingTag) {
        if (id === void 0) { id = null; }
        if (content === void 0) { content = null; }
        if (parent === void 0) { parent = null; }
        if (hasClosingTag === void 0) { hasClosingTag = false; }
        var classTypes = [];
        for (var _i = 5; _i < arguments.length; _i++) {
            classTypes[_i - 5] = arguments[_i];
        }
        var _this = _super.call(this, id, content, parent) || this;
        _this.tagType = tagType;
        _this.hasClosingTag = hasClosingTag;
        _this.classes = classTypes.map(function (t) { return new RenderClass(t); });
        return _this;
    }
    //Public methods
    RenderTagElement.prototype.render = function () {
        return this.openTag()
            .appendId()
            .appendClasses()
            .closeTag()
            .appendContent()
            .appendClosingTag()
            .toString();
    };
    RenderTagElement.prototype.getTagType = function () {
        return this.tagType;
    };
    RenderTagElement.prototype.addClass = function (classType) {
        if (this.hasClass(classType)) {
            return false;
        }
        this.classes.push(new RenderClass(classType));
        return true;
    };
    RenderTagElement.prototype.removeClass = function (classType) {
        if (!this.hasClass(classType)) {
            return false;
        }
        this.classes = this.classes.filter(function (c) { return c.getClassType() != classType; });
        return true;
    };
    RenderTagElement.prototype.hasClass = function (classType) {
        return this.classes.filter(function (c) { return c.getClassType() == classType; }).length > 0;
    };
    // Private methods
    RenderTagElement.prototype.openTag = function () {
        this.str = "";
        var tagType = this.getTagType();
        if (tagType) {
            this.str += "<".concat(tagType);
        }
        return this;
    };
    RenderTagElement.prototype.appendId = function () {
        if (this.id) {
            this.str += " id=\"".concat(this.id.toString()).concat("\"");
        }
        return this;
    };
    RenderTagElement.prototype.appendClasses = function () {
        if (this.classes.length > 0) {
            this.str += " class=\"";
            for (var i = 0; i < this.classes.length; i++) {
                this.str += this.classes[i].toString();
                if (i != this.classes.length - 1) {
                    this.str += " ";
                }
            }
            this.str += "\"";
        }
        return this;
    };
    RenderTagElement.prototype.closeTag = function () {
        this.str += ">";
        return this;
    };
    RenderTagElement.prototype.appendContent = function () {
        var content = this.getContent();
        if (content) {
            this.str += content;
        }
        return this;
    };
    RenderTagElement.prototype.appendClosingTag = function () {
        if (this.hasClosingTag) {
            this.str += "</".concat(this.tagType).concat(">");
        }
        return this;
    };
    RenderTagElement.prototype.toString = function () {
        return this.str;
    };
    return RenderTagElement;
}(RenderElement));
var RenderTagElementType;
(function (RenderTagElementType) {
    RenderTagElementType["SPAN"] = "span";
    RenderTagElementType["BR"] = "br";
})(RenderTagElementType || (RenderTagElementType = {}));
var ResetButton = /** @class */ (function (_super) {
    __extends(ResetButton, _super);
    // Constructor
    function ResetButton(parent) {
        if (parent === void 0) { parent = null; }
        return _super.call(this, "resetButton", "Reset", parent, RenderTagElementType.SPAN, true, RenderClassType.ASCII_REAL_BUTTON) || this;
    }
    return ResetButton;
}(RenderTagElement));
var Row = /** @class */ (function (_super) {
    __extends(Row, _super);
    // Constructor
    function Row(parent) {
        if (parent === void 0) { parent = null; }
        var _this = _super.call(this, null, parent) || this;
        _this.size = 0;
        return _this;
    }
    Row.prototype.addSquare = function (square) {
        if (this.size < Row.CAPACITY) {
            this.size++;
            this.addElements(square, this.size == Row.CAPACITY ? RenderArea.getBrTagElement() : new SquareSeparator());
        }
    };
    Row.prototype.addSquareSeparator = function () {
        this.addElements(new SquareSeparator());
    };
    Row.CAPACITY = 3;
    return Row;
}(RenderArea));
var RowSeparator = /** @class */ (function (_super) {
    __extends(RowSeparator, _super);
    // Constructor
    function RowSeparator(parent) {
        if (parent === void 0) { parent = null; }
        var _this = _super.call(this, null, parent) || this;
        _this.addElements(new RenderElement(null, "---+---+---"), RenderArea.getBrTagElement());
        return _this;
    }
    return RowSeparator;
}(RenderArea));
var Square = /** @class */ (function (_super) {
    __extends(Square, _super);
    // Constructor
    function Square(parent, index, sign) {
        if (parent === void 0) { parent = null; }
        if (sign === void 0) { sign = TicTacToeSign.NO_SIGN; }
        var _this = _super.call(this, null, parent) || this;
        _this.index = index;
        _this.sign = sign;
        var id = "square".concat(index.toString());
        _this.addElements(new RenderTagElement(id, " ".concat(_this.sign).concat(" "), _this, RenderTagElementType.SPAN, true, RenderClassType.SQUARE, RenderClassType.CURSOR_POINTER));
        _this.addLinks(new RenderLinkClick("#".concat(id), new CallbackCollection(_this.markSquare.bind(_this))));
        return _this;
    }
    // Public method
    Square.prototype.markSquare = function () {
        if (this.sign == TicTacToeSign.NO_SIGN) {
            this.setSign(TicTacToeSign.X);
            var board = this.parent.getParent();
            var result = MinimaxAlgorithm.run(board.toArray(), TicTacToeSign.O);
            if (result.score == 0) {
                if (result.index != null) {
                    board.squares[result.index].setSign(TicTacToeSign.O);
                }
                else {
                    this.setStatus(board, "You tied... (._.)");
                }
            }
            else if (result.score > 0) {
                if (result.index != null) {
                    board.squares[result.index].setSign(TicTacToeSign.O);
                }
                if (MinimaxAlgorithm.winning(board.toArray(), TicTacToeSign.O)) {
                    this.setStatus(board, "You lost... (;_;)");
                }
            }
            else {
                // never gonna happen
            }
        }
    };
    Square.prototype.setSign = function (sign) {
        this.sign = sign;
        this.disable();
    };
    Square.prototype.setStatus = function (board, message) {
        var content = board.getParent();
        var status = content.getStatus();
        status.setContent(message);
        status.update();
        board.squares.forEach(function (s) { return s.disable(); });
    };
    Square.prototype.disable = function () {
        var renderTagElement = this.elements[0];
        renderTagElement.setContent(" ".concat(this.sign).concat(" "));
        renderTagElement.addClass(RenderClassType.CURSOR_NOT_ALLOWED);
        renderTagElement.removeClass(RenderClassType.CURSOR_POINTER);
        this.removeAllLinks();
        this.update();
    };
    return Square;
}(RenderArea));
var SquareSeparator = /** @class */ (function (_super) {
    __extends(SquareSeparator, _super);
    // Constructor
    function SquareSeparator() {
        return _super.call(this, null, "|") || this;
    }
    return SquareSeparator;
}(RenderElement));
var Status = /** @class */ (function (_super) {
    __extends(Status, _super);
    // Constructor
    function Status(parent) {
        if (parent === void 0) { parent = null; }
        return _super.call(this, "status", null, parent, RenderTagElementType.SPAN, true) || this;
    }
    // Public methods
    Status.prototype.reset = function () {
        this.setContent(null);
        this.update();
    };
    return Status;
}(RenderTagElement));
var TicTacToeSign;
(function (TicTacToeSign) {
    TicTacToeSign["NO_SIGN"] = " ";
    TicTacToeSign["X"] = "X";
    TicTacToeSign["O"] = "O";
})(TicTacToeSign || (TicTacToeSign = {}));
var Title = /** @class */ (function (_super) {
    __extends(Title, _super);
    // Constructor
    function Title(parent) {
        if (parent === void 0) { parent = null; }
        var _this = _super.call(this, "title", parent) || this;
        _this.addElements(_this.getHorizontalBoundary(), RenderArea.getBrTagElement(), _this.getVerticalBoundary(), new RenderElement(null, "ASCII Tic-Tac-Toe"), _this.getVerticalBoundary(), RenderArea.getBrTagElement(), _this.getHorizontalBoundary());
        _this.update();
        return _this;
    }
    // Private methods
    Title.prototype.getHorizontalBoundary = function () {
        return new RenderElement(null, " +-------------------+ ");
    };
    Title.prototype.getVerticalBoundary = function () {
        return new RenderElement(null, " | ");
    };
    return Title;
}(RenderArea));
var Main;
(function (Main) {
    var game = null;
    function documentIsReady() {
        game = new Game();
    }
    Main.documentIsReady = documentIsReady;
})(Main || (Main = {}));
$(document).ready(function () {
    Main.documentIsReady();
});

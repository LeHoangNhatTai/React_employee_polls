const {_saveQuestion, _saveQuestionAnswer} = require("./_DATA");

describe("_saveQuestion", () => {
    it("will return the question with all expected fields are populated if correct data", async () => {
        const result = await _saveQuestion({
            optionOneText: "Op-1 test",
            optionTwoText: "Op-2 test",
            author: "tylermcginnis",
        });

        expect(result.id).toBeTruthy();
        expect(result.timestamp).toBeTruthy();
        expect(result.author).toBe("tylermcginnis");
        expect(result.optionOne.text).toBe("Op-1 test");
        expect(result.optionTwo.text).toBe("Op-2 test");
    });

    it("will return error if incorrect data", async () => {
        const result = await _saveQuestion({
            optionOneText: null,
            optionTwoText: "Op-2 test2",
            author: undefined,
        })
        .catch(e => e);

        expect(result).toBe("Please provide optionOneText, optionTwoText, and author");
    });
});

describe("_saveQuestionAnswer", () => {
    it("will return true if correct data", async () => {
        const result = await _saveQuestionAnswer({
            authedUser: "tylermcginnis", 
            qid: "am8ehyc8byjqgar0jgpub9", 
            answer: "optionTwo",
        });

        expect(result).toBeTruthy();
    });

    it("will return error if incorrect data", async () => {
        const result = await _saveQuestionAnswer({
            authedUser: "tylermcginnis", 
            qid: undefined, 
            answer: "optionTwo",
        })
        .catch(e => e);

        expect(result).toBe("Please provide authedUser, qid, and answer");
    });
});
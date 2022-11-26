export const test_utils = {
    test_types: {
        generated: 18,
        custom: 17,
    },
    question_categories_radios: [
        {id: 1, title: 'Общая'},
        {id: 2, title: 'Собственная'}
    ],

    toTestFormat(test)
    {
        if (test.testType && Object.keys(test.testType).length !== 0 && test.testType.constructor === Object) {
            test.testTypeId = test.testType.id;
            delete test.testType;
        }

        if (test.questionCategory && Object.keys(test.questionCategory).length !== 0 && test.questionCategory.constructor === Object) {
            test.questionCategoryId = test.questionCategory.id;
            delete test.questionCategory;
        }

        test.questionsNumber = Number(test.questionsNumber);
        test.executionTime = Number(test.executionTime);

        return test;
    },
}
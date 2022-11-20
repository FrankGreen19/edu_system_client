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
        test.testTypeId = test.testType.id;
        test.questionCategoryId = test.questionCategory.id;
        test.questionsNumber = Number(test.questionsNumber);
        test.executionTime = Number(test.executionTime);

        delete test.testType;
        delete test.questionCategory;

        return test;
    },
}
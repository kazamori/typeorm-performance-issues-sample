#!/bin/bash

CUR_DIR=$(dirname "$0")
echo "current directory: $CUR_DIR"

export PGPASSWORD="password"
PSQL_CLI="psql --host localhost --port 15432 --username root test --command"

get_psql_cli() {
    local name="$1"
    local fields="$2"

    echo "$PSQL_CLI '\copy \"${name}\"(${fields}) from ${CUR_DIR}/${name}.csv with csv;'"
}

run() {
    local cli="$*"
    echo "$cli"
    eval $cli
}

main() {
    run $(get_psql_cli "attach" '"attr"')
    run $(get_psql_cli "category" '"name"')
    run $(get_psql_cli "category4" '"name"')
    run $(get_psql_cli "user" '"name"')
    # posts
    run $(get_psql_cli "post1" '"contents","userId","attachId"')
    run $(get_psql_cli "post1_categories_category" '"post1Id","categoryId"')
    run $(get_psql_cli "post2" '"contents","userId","attachId"')
    run $(get_psql_cli "post2_categories_category" '"post2Id","categoryId"')
    run $(get_psql_cli "post3" '"contents","userId","attachId"')
    run $(get_psql_cli "post3_categories_category" '"post3Id","categoryId"')
    run $(get_psql_cli "post4" '"contents","userId","attachId"')
    run $(get_psql_cli "post4_categories_category4" '"post4Id","category4Id"')
    # article
    run $(get_psql_cli "article" '"wordCount","readMinutes","text1","text2","text3","text4","text5","text6","text7","text8","userId","attachId"')
    run $(get_psql_cli "article_categories_category" '"articleId","categoryId"')
}

main "$@" || exit $?

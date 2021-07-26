#!/bin/bash

export PGPASSWORD="password"

date
rm -f article.csv
for ((i=0; i<100000; i++))
do
    echo "100,10,text1-${i},text2-${i},text3-${i},text4-${i},text5-${i},text6-${i},text7-${i},text8-${i}" >> article.csv
done
psql --host localhost --port 15432 --username root test --command '\copy "article"("wordCount","readMinutes","text1","text2","text3","text4","text5","text6","text7","text8") from ./article.csv with csv;'
date

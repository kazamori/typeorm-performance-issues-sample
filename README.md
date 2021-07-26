# typeorm-performance-issues-sample

Sample application for typeorm peformance

## configure database environment and create test data

```bash
$ docker-compose up -d
$ yarn dbinit
initialize tables and create data
...
Done in 11.81s.
```

```bash
$ docker-compose exec postgres psql -h localhost -U root test
psql (12.7)
test=# \d
                   List of relations
 Schema |            Name            |   Type   | Owner
--------+----------------------------+----------+-------
 public | attach                     | table    | root
 public | attach_id_seq              | sequence | root
 public | category                   | table    | root
 public | category4                  | table    | root
 public | category4_id_seq           | sequence | root
 public | category_id_seq            | sequence | root
 public | comment                    | table    | root
 public | comment_id_seq             | sequence | root
 public | post1                      | table    | root
 public | post1_categories_category  | table    | root
 public | post1_id_seq               | sequence | root
 public | post2                      | table    | root
 public | post2_categories_category  | table    | root
 public | post2_id_seq               | sequence | root
 public | post3                      | table    | root
 public | post3_categories_category  | table    | root
 public | post3_id_seq               | sequence | root
 public | post4                      | table    | root
 public | post4_categories_category4 | table    | root
 public | post4_id_seq               | sequence | root
 public | user                       | table    | root
 public | user_id_seq                | sequence | root
(22 rows)
```

## Benchmark

### Run RelationId related benchmakrs

```bash
$ yarn test --testNamePattern RelationId
```

Results

* https://gist.github.com/t2y/6c9283cf620740a3c1fee5bb9ddfc800#file-results-md

### Run server application to inspect heap memory usage 

```bash
$ yarn memoryProfile
Debugger listening on ws://127.0.0.1:9229/d47fd7ee-d7a6-418b-a329-66de1b4466a6
...
```

### Run Distinct with relations query

```bash
$ env DEBUG=true yarn test --testNamePattern "Distinct"
```

### Run Bulk insert benchmarks

```bash
$ yarn test --testNamePattern "Bulk create 1000 articles 100 times"
```

```bash
$ bash tests/bulk/psql.sh 
```

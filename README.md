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
 Schema |           Name           |   Type   | Owner
--------+--------------------------+----------+-------
 public | attach                   | table    | root
 public | attach_id_seq            | sequence | root
 public | category                 | table    | root
 public | category_id_seq          | sequence | root
 public | post                     | table    | root
 public | post_categories_category | table    | root
 public | post_id_seq              | sequence | root
 public | user                     | table    | root
 public | user_id_seq              | sequence | root
(9 rows)
```

## Benchmark

### Run RelationId related benchmakrs

```bash
$ yarn test -t RelationId
```


#!/bin/bash
i=1
for f in *.json
do
	mv $f data_subject_${i}.json 
	i=$((i+1))
done

if [ $# -eq 0 ]
then
    echo Message du commit: 
    read commit_message
else
    commit_message=$1
fi

git add .
git commit -m "$commit_message"
git push origin master
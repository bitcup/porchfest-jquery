setup repo after creating new bootstrap project from intellij
-------------------------------------------------------------
create new git repo porchfest-jquery in github
in intellij, enable vcs
in intellij, add .gitignore + add files to vcs
commit "first commit"
git branch -M master
git remote add origin https://github.com/bitcup/porchfest-jq.git
git push -u origin master


serve site
----------
cd <proj_dir>
npx serve

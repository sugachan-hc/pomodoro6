#!/usr/bin/env bash
# exit on error
set -o errexit

echo "render-bulid.sh: start"

echo "installing bundle"
bundle install

echo "precompiling assets"
# add 
bundle exec rails assets:clobber
bundle exec rake assets:precompile
bundle exec rake assets:clean

echo "executing migrate"
bundle exec rails db:migrate

# echo "executing seed"
# bundle exec rails db:seed

echo "render-build.sh: done"

*Deprecated: See http://github.com/nodejs/citgm*

An inelegant brute force test harness. Grabs the currently most depended on
npm modules (as of 2015-02-21) and tests them against node by running their
own test cases. Results are stored in the out directory. Look for the -rpt
files.

Usually the tests are run by calling `npm test`, but if the package exposes
it's own test suite, we attempt to run that.

This will step through a fetch the latest code from github for every module
and run each test sequentially so it can take quite a while to complete.

There's nothing elegant about this so don't expect much.

To run: `npm test`

the point of this is to provide a bit of a sniff test for node.js builds.

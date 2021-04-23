classdef QC_Test < matlab.unittest.TestCase

    methods (Test) 
        
        function test_check_corrupt(testCase)
            %  Column C has corrupt data (-999) between 7:30 and 9:30
            simple = readtable('../../examples/data/qc/simple.xlsx');
            data.values = simple.C;
            data.time = simple.Var1;
            corrupt_vals = {-999};
            for i = 1:length(data.values)
                if data.values(i) == -999
                    expect.values(i) = NaN;
                    expect.mask(i) = 0;
                else
                    expect.values(i) = data.values(i);
                    expect.mask(i) = 1;
                end
            end
            expected.values = expect.values.';
            expected.mask = int64(expect.mask.');
            results = check_corrupt(data,corrupt_vals);
            assertEqual(testCase, results.values, expected.values);
            assertEqual(testCase, results.mask, expected.mask);
        end
              
        function test_check_delta(testCase)
%             % Column A has the same value (0.5) from 12:00 until 14:30
            % Column C does not follow the expected sine function from 13:00 until 16:15. 
%             % The change is abrupt and gradually corrected.
            simple = readtable('../../examples/data/qc/simple.xlsx');
            dataA.values = simple.A;
            dataC.values = simple.C;
            dataA.time = simple.Var1;
            dataC.time = simple.Var1;
%             disp(dataA.time)
            format long
            datenumA = datenum(dataA.time);
            datenumC = datenum(dataC.time);
%             disp(datenumA)
%             disp(dataC.time)
%             disp(datenumC)
%             bound = [0.0001, 0.6];
            bound = [-1.0, 1.0];
            window = 2*3600; % seconds
            for i = 1:length(datenumA)
                if datenumA(i) >= 7.359654999999999 && datenumA(i) <= 7.359656041666665
                    expectA.values(i) = NaN;
                    expectA.mask(i) = 0;
                else
                    expectA.values(i) = dataA.values(i);
                    expectA.mask(i) = 1;
                end
            end
            for ii = 1:length(datenumC)
                if datenumC(ii) >= 7.359655416666667 && datenumC(ii) <= 7.359656770833332
                    expectC.values(ii) = NaN;
                    expectC.mask(ii) = 0;
                else
                    expectC.values(ii) = dataC.values(ii);
                    expectC.mask(ii) = 1;
                end
            end
            expectedA.values = expectA.values.';
            expectedA.mask = int64(expectA.mask.');
            expectedC.values = expectC.values.';
            expectedC.mask = int64(expectC.mask.');
            resultsA = check_delta(dataA,bound,window);
            resultsC = check_delta(dataC,bound,window);
            assertEqual(testCase, resultsA.values, expectedA.values);
            assertEqual(testCase, resultsA.mask, expectedA.mask);
            assertEqual(testCase, resultsC.values, expectedC.values);
            assertEqual(testCase, resultsC.mask, expectedC.mask);
        end

        function test_check_increment(testCase)
            % Column A has the same value (0.5) from 12:00 until 14:30
            % Column C does not follow the expected sine function from 13:00 until 16:15.
            % The change is abrupt and gradually corrected.
            simple = readtable('../../examples/data/qc/simple.xlsx');
            dataA.values = simple.A;
            dataC.values = simple.C;
            dataA.time = simple.Var1;
            dataC.time = simple.Var1;
%             disp(dataC.time)
            format long
            datenumA = datenum(dataA.time);
            datenumC = datenum(dataC.time);
%             disp(datenumC)
            bound = [0.0001, 0.6];
%             for i = 1:length(datenumA)
%                 if datenumA(i) >= 7.359654999999999 && datenumA(i) <= 7.359656041666665
%                     expectA.values(i) = NaN;
%                     expectA.mask(i) = 0;
%                 else
%                     expectA.values(i) = dataA.values(i);
%                     expectA.mask(i) = 1;
%                 end
%             end
%             for ii = 1:length(datenumC)
%                 if datenumC(ii) >= 7.359655416666667 && datenumC(ii) <= 7.359656770833332
%                     expectC.values(ii) = NaN;
%                     expectC.mask(ii) = 0;
%                 else
%                     expectC.values(ii) = dataC.values(ii);
%                     expectC.mask(ii) = 1;
%                 end
%             end
            expectA.values = zeros(size(dataA.values));
            for i = 1:96
                if i >= 48 && i <= 58
                    expectA.values(i) = NaN;
                    expectA.mask(i) = 0;
                else
                    expectA.values(i) = dataA.values(i);
                    expectA.mask(i) = 1;
                end   
            end
            expectC.values = zeros(size(dataC.values));
            for ii = 1:96
                if i >= 52 && i <= 65
                    expectC.values(ii) = NaN;
                    expectC.mask(ii) = 0;
                else
                    expectC.values(ii) = dataC.values(ii);
                    expectC.mask(ii) = 1;
                end   
            end
            expectedA.values = expectA.values;
            expectedA.mask = int64(expectA.mask.');
            expectedC.values = expectC.values;
            expectedC.mask = int64(expectC.mask.');
%             disp(expectedA.values)
%             disp(expectedC.values)
            resultsA = check_increment(dataA,bound);
            resultsC = check_increment(dataC,bound);
            assertEqual(testCase, resultsA.values, expectedA.values);
            assertEqual(testCase, resultsA.mask, expectedA.mask);
            assertEqual(testCase, resultsC.values, expectedC.values);
            assertEqual(testCase, resultsC.mask, expectedC.mask);
        end

        function test_check_missing(testCase)
            % Column D is missing data from 17:45 until 18:15
            simple = readtable('../../examples/data/qc/simple.xlsx');
            data.values = simple.D;
            data.time = simple.Var1;
            A = ismissing(data.values);
            for i = 1:length(A)
                if A(i) == 1
                    expect.values(i) = NaN;
                    expect.mask(i) = 0;
                else
                    expect.values(i) = data.values(i);
                    expect.mask(i) = 1;
                end
            end
            expected.values = expect.values.';
            expected.mask = int64(expect.mask.');
            results = check_missing(data);
            assertEqual(testCase, results.values, expected.values);
            assertEqual(testCase, results.mask, expected.mask);
        end

%         function test_check_outlier(testCase)
% 
%         end  
        
%         function test_check_range(testCase)
%             % Column B is below the expected lower bound of 0 at 6:30 and above the expected upper bound of 1 at 15:30
%             % Column D is occasionally below the expected lower bound of -1 around midday (2 time steps)
%             % and above the expected upper bound of 1 in the early morning and late evening (10 time steps).
%         end
        
      

        function test_check_timestamp(testCase)
%             % Missing timestamp at 5:00
%             % Duplicate timestamp 17:00
%             % Non-monotonic timestamp 19:30
            simple = readtable('../../examples/data/qc/simple.xlsx');
            data.values = simple.A;
            data.time = simple.Var1;
            unq = unique(data.time);
            miss = ismissing(data.time);
            format long
            dn = datenum(data.time);
            disp(dn)
            freq = 900; % seconds
            results = check_timestamp(data,freq);
            disp(results.values)
            for i = 1:length(data.time)
                if data.time(i)~= unq(i) || dn(i) == 7.359656041666665 || dn(i) == 7.359656041666665
                    expect.values(i) = NaN;
                    expect.mask(i) = 0;
                else
                    expect.values(i) = data.time(i);
                    expect.mask(i) = 1;
                end
            end
            expected.values = expect.values.';
            expected.mask = int64(expect.mask.');
            results = check_timestamp(data,freq);
            assertEqual(testCase, results.values, expected.values);
            assertEqual(testCase, results.mask, expected.mask);
        end
    end
end  
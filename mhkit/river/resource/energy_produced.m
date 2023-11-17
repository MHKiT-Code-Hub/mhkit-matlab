function E=energy_produced(P,seconds)

%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%     Returns the energy produced for a given time period provided
%     exceedence probability and power.
%
% Parameters
% ----------
%     P : Power [W]
%
%         Pandas dataframe indexed by time [datetime or s]:
%
%           To make a pandas data frame from user supplied frequency and spectra
%           use py.mhkit_python_utils.pandas_dataframe.timeseries_to_pandas(timeseries,time,x)
%
%         OR
%
%         structure of form:
%
%           P.P
%
%           P.time [s]
%
%     seconds : float
%         seconds in the time period of interest
%
% Returns
% -------
%     E : Structure
%
%
%        P.P: Power [W]
%
%        P.time: epoch time [s]
%
%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

py.importlib.import_module('mhkit_python_utils');
py.importlib.import_module('mhkit');


if (isa(P,'py.pandas.core.frame.DataFrame')~=1)
    x=size(P.P);
    li=py.list();
    if x(2)>1
        for i = 1:x(2)
            app=py.list(P.P(:,i));
            li=py.mhkit_python_utils.pandas_dataframe.lis(li,app);

        end
    elseif x(2) ==1
        li=P.P;
    end


    % P=py.mhkit_python_utils.pandas_dataframe.timeseries_to_pandas(li,P.time,int32(x(2)));
    P = py.mhkit_python_utils.pandas_dataframe.list_to_series(li, P.time);
end

E=py.mhkit.river.resource.energy_produced(P,seconds);

